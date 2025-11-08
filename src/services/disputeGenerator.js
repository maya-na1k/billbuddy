import OpenAI from 'openai';
import { supabase } from './supabase';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

// ---------------------------
// Generate a professional dispute letter
// ---------------------------
export async function generateDisputeLetter(billId) {
  try {
    // Fetch bill data
    const { data: bill } = await supabase
      .from('medical_bills')
      .select('*')
      .eq('id', billId)
      .single();

    // Fetch analysis
    const { data: analysis } = await supabase
      .from('bill_analyses')
      .select('*')
      .eq('bill_id', billId)
      .single();

    // Fetch flagged line items
    const { data: flaggedItems } = await supabase
      .from('bill_line_items')
      .select('*')
      .eq('bill_id', billId)
      .not('flag_type', 'is', null);

    // Fetch user profile
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // ---------------------------
    // Prompt for OpenAI
    // ---------------------------
    const prompt = `You are a professional patient advocate writing a formal dispute letter to a hospital billing department.

BILL INFORMATION:
- Provider: ${bill.provider_name || 'Medical Provider'}
- Service Date: ${bill.service_date || 'N/A'}
- Total Charges: $${bill.total_charges || 0}
- Account Number: ${bill.account_number || 'N/A'}

PATIENT INFORMATION:
- Name: ${profile.full_name || 'Patient'}
- Email: ${profile.email || 'N/A'}

BILLING ISSUES FOUND:
${JSON.stringify(analysis.detailed_report, null, 2)}

FLAGGED CHARGES:
${JSON.stringify(flaggedItems, null, 2)}

Write a professional, formal dispute letter that:
1. Is addressed properly to the billing department
2. Clearly states the purpose (disputing incorrect charges)
3. Lists specific line items with issues
4. References relevant billing regulations and patient rights
5. Requests itemized review and correction within 30 days
6. Maintains a firm but professional tone
7. Includes a placeholder for patient signature and date

Format as a complete letter ready to print and send.
Use plain text only (no markdown or special formatting).`;

    // ---------------------------
    // Generate the letter via OpenAI
    // ---------------------------
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3
    });

    const letter = response.choices[0].message.content;

    // ---------------------------
    // Save to Supabase
    // ---------------------------
    const { data: savedLetter, error } = await supabase
      .from('dispute_documents')
      .insert({
        bill_id: billId,
        document_type: 'dispute_letter',
        content: letter
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      letter: letter,
      documentId: savedLetter.id
    };

  } catch (error) {
    console.error('Error generating dispute letter:', error);
    throw error;
  }
}