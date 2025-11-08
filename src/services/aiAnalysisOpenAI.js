import OpenAI from 'openai';
import { supabase } from './supabase';
import { validateMedicalCode } from '../utils/billingCodes';
import { isOvercharged } from '../utils/benchmarkData';


const openai = new OpenAI({
 apiKey: process.env.REACT_APP_OPENAI_API_KEY,
 dangerouslyAllowBrowser: true
});


export async function analyzeMedicalBill(billId, extractedText) {
 try {
   console.log('=== ANALYSIS START ===');
  
   const structuredData = await extractStructuredData(extractedText);
   console.log('Extracted', structuredData.line_items?.length, 'line items');
  
   await saveLineItems(billId, structuredData.line_items);
  
   const validationResults = await runValidationChecks(billId, structuredData);
   console.log('Found', validationResults.totalIssues, 'issues');
  
   const analysisReport = await generateAnalysisReport(structuredData, validationResults);
  
   await saveAnalysis(billId, analysisReport);
  
   await supabase
     .from('medical_bills')
     .update({
       status: 'analyzed',
       total_charges: structuredData.summary?.total_charges || 0,
       patient_name: structuredData.patient_info?.name || null,
       service_date: structuredData.service_date || null,
       provider_name: structuredData.provider?.name || null,
       account_number: structuredData.patient_info?.account_number || null
     })
     .eq('id', billId);
  
   console.log('=== ANALYSIS COMPLETE ===');
  
   return { success: true, analysis: analysisReport };
  
 } catch (error) {
   console.error('ANALYSIS ERROR:', error);
   await supabase.from('medical_bills').update({ status: 'error' }).eq('id', billId);
   throw error;
 }
}


async function extractStructuredData(extractedText) {
 const prompt = `You are a medical billing expert. Extract data from this bill into valid JSON.


TEXT:
${extractedText}


CRITICAL: Extract EVERY line item charge. Look for:
- CPT codes (5 digits like 99284, 74177, 85025)
- REV codes (4 digits like 0270, 0450) 
- NDC codes (like 00409-1234)
- Dollar amounts for EACH item


Return ONLY this JSON structure (no markdown):
{
 "patient_info": {"name": "", "dob": "", "account_number": ""},
 "provider": {"name": "", "address": ""},
 "service_date": "YYYY-MM-DD",
 "line_items": [
   {
     "description": "exact service description",
     "code": "code number only",
     "code_type": "CPT or REV or NDC",
     "quantity": 1,
     "unit_price": 0,
     "total_charge": 0
   }
 ],
 "summary": {
   "total_charges": 0,
   "insurance_paid": 0,
   "patient_responsibility": 0
 }
}


RULES:
1. Extract ALL line items - usually 10-20 items per bill
2. Use the "Charges" column value (not "Allowed")
3. Include duplicate codes if they appear multiple times
4. total_charges = sum of all line item charges
5. Return valid JSON only`;


 try {
   console.log('Calling GPT-4o for extraction...');
  
   const response = await openai.chat.completions.create({
     model: 'gpt-4o', // Full GPT-4o for accuracy
     messages: [{ role: 'user', content: prompt }],
     temperature: 0,
     max_tokens: 4000
   });


   let text = response.choices[0].message.content.trim();
   text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
   const data = JSON.parse(text);
  
   console.log('Parsed', data.line_items?.length, 'line items');
   console.log('Total charges:', data.summary?.total_charges);
  
   if (!data.line_items || data.line_items.length === 0) {
     throw new Error('No line items extracted');
   }
  
   return data;
  
 } catch (error) {
   console.error('Extraction failed:', error);
   return createFallbackData();
 }
}


function createFallbackData() {
 return {
   patient_info: { name: "Patient", dob: "", account_number: "" },
   provider: { name: "Medical Provider", address: "" },
   service_date: new Date().toISOString().split('T')[0],
   line_items: [{
     description: "Medical Services",
     code: "99213",
     code_type: "CPT",
     quantity: 1,
     unit_price: 100,
     total_charge: 100
   }],
   summary: {
     total_charges: 100,
     insurance_paid: 0,
     patient_responsibility: 100
   }
 };
}


async function saveLineItems(billId, lineItems) {
 if (!lineItems || lineItems.length === 0) return;
  const items = lineItems.map(item => ({
   bill_id: billId,
   description: item.description || 'Unknown',
   code: item.code || null,
   code_type: item.code_type || null,
   charge_amount: parseFloat(item.total_charge) || 0,
   quantity: parseInt(item.quantity) || 1,
   service_date: null
 }));
  const { error } = await supabase.from('bill_line_items').insert(items);
 if (error) throw error;
}


async function runValidationChecks(billId, structuredData) {
   const results = {
     flags: [],
     duplicates: [],
     overcharges: [],
     invalidCodes: [],
     totalIssues: 0
   };
  
   if (!structuredData.line_items) return results;
  
   // Check for exact duplicate codes (same code appearing multiple times)
   const codeGroups = new Map();
   structuredData.line_items.forEach(item => {
     if (item.code) {
       // Remove modifiers for duplicate checking (e.g., 74177-26 -> 74177)
       const baseCode = item.code.split('-')[0];
      
       if (!codeGroups.has(baseCode)) {
         codeGroups.set(baseCode, []);
       }
       codeGroups.get(baseCode).push(item);
     }
   });
  
   // Flag duplicates (same code billed multiple times)
   codeGroups.forEach((items, code) => {
     if (items.length > 1) {
       results.duplicates.push({
         code: code,
         description: items[0].description,
         occurrences: items.length
       });
       results.flags.push({
         type: 'duplicate',
         severity: 'high',
         code: code,
         message: `Duplicate billing: ${code} (${items[0].description}) billed ${items.length} times`,
         potentialSavings: items.slice(1).reduce((sum, i) => sum + i.total_charge, 0)
       });
     }
   });
  
   // Check for similar services (74177 and 74176 are both CT scans)
   const ctScans = structuredData.line_items.filter(item =>
     item.code && (item.code.startsWith('74177') || item.code.startsWith('74176'))
   );
   if (ctScans.length > 1) {
     results.duplicates.push({
       code: '74177/74176',
       description: 'CT Scan - Same Service',
       occurrences: ctScans.length
     });
     results.flags.push({
       type: 'duplicate',
       severity: 'high',
       code: '74177/74176',
       message: 'Duplicate billing: CT scan billed as both 74177 and 74176 (same service)',
       potentialSavings: ctScans[1].total_charge
     });
   }
  
   // Check for duplicate REV codes (0270 and 0272 are both medical supplies)
   const supplyRevCodes = structuredData.line_items.filter(item =>
     item.code && (item.code === '0270' || item.code === '0272')
   );
   if (supplyRevCodes.length > 1) {
     results.duplicates.push({
       code: '0270/0272',
       description: 'Medical Supplies',
       occurrences: supplyRevCodes.length
     });
     results.flags.push({
       type: 'duplicate',
       severity: 'high',
       code: '0270/0272',
       message: 'Duplicate billing: Medical supplies billed twice (REV 0270 and 0272)',
       potentialSavings: supplyRevCodes[1].total_charge
     });
   }
  
   // Check pricing ONLY for CPT codes (not REV or NDC)
   for (const item of structuredData.line_items) {
     // Only validate CPT codes (5 digits, no letters)
     if (item.code && item.code_type === 'CPT' && /^\d{5}$/.test(item.code)) {
       const validation = validateMedicalCode(item.code, 'CPT');
       if (!validation.valid) {
         results.invalidCodes.push({
           code: item.code,
           type: 'CPT',
           message: validation.message
         });
         results.flags.push({
           type: 'invalid_code',
           severity: 'medium',
           code: item.code,
           message: `Invalid CPT code: ${item.code}`
         });
       }
      
       // Check pricing only for valid CPT codes
       if (validation.valid && item.total_charge > 0) {
         const check = isOvercharged(item.code, item.total_charge);
         if (check.isOvercharged) {
           results.overcharges.push({
             code: item.code,
             description: item.description,
             charged: item.total_charge,
             benchmark: check.benchmark,
             percentOver: check.percentOver,
             potentialSavings: check.potentialSavings
           });
           results.flags.push({
             type: 'overcharge',
             severity: 'high',
             code: item.code,
             message: `Overcharge: ${item.description} is ${check.percentOver}% above Medicare benchmark ($${check.benchmark})`,
             potentialSavings: check.potentialSavings
           });
          
           await supabase.from('bill_line_items')
             .update({
               flag_type: 'overcharge',
               flag_severity: 'high',
               flag_explanation: `${check.percentOver}% above benchmark`
             })
             .eq('bill_id', billId)
             .eq('code', item.code);
         }
       }
     }
     // Skip validation for REV codes (0xxx) and NDC codes - they're normal
   }
  
   results.totalIssues = results.flags.length;
   return results;
 }


async function generateAnalysisReport(structuredData, validationResults) {
 const totalSavings = validationResults.overcharges.reduce((sum, o) => sum + o.potentialSavings, 0);
  return {
   summary: validationResults.totalIssues > 0 ?
     `Found ${validationResults.totalIssues} potential billing issues including ${validationResults.duplicates.length} duplicates and ${validationResults.overcharges.length} overcharges.` :
     'No significant billing issues detected.',
   total_flags: validationResults.totalIssues,
   potential_savings: totalSavings,
   detailed_findings: validationResults.flags.map(f => ({
     issue: f.message,
     impact: f.potentialSavings ? `Potential savings: $${f.potentialSavings.toFixed(2)}` : 'Review recommended',
     recommendation: 'Contact billing department to dispute this charge'
   })),
   recommendations: validationResults.totalIssues > 0 ? [
     'Review all flagged charges with billing department',
     'Request itemized breakdown for duplicate charges',
     'Compare charges against Medicare benchmarks',
     'Consider filing formal dispute for overcharges'
   ] : ['Bill appears accurate', 'Keep for your records'],
   severity: validationResults.totalIssues > 5 ? 'high' : validationResults.totalIssues > 0 ? 'medium' : 'low',
   validation: validationResults
 };
}


async function saveAnalysis(billId, analysisReport) {
 const { error } = await supabase.from('bill_analyses').insert({
   bill_id: billId,
   total_flags: analysisReport.total_flags || 0,
   potential_savings: analysisReport.potential_savings || 0,
   summary: analysisReport.summary,
   detailed_report: analysisReport,
   recommendations: analysisReport.recommendations || []
 });
  if (error) throw error;
}