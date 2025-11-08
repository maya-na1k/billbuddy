import OpenAI from 'openai';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function extractTextFromFile(file, onProgress) {
  try {
    console.log('=== OCR START ===');
    console.log('File:', file.name, 'Type:', file.type);
    
    if (onProgress) onProgress(10);
    
    // Handle PDFs
    if (file.type === 'application/pdf') {
      console.log('PDF detected - extracting text...');
      return await extractTextFromPDF(file, onProgress);
    }
    
    // Handle images
    console.log('Image detected - using GPT-4o Vision...');
    const base64Image = await convertFileToBase64(file);
    
    if (onProgress) onProgress(30);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Extract ALL text from this medical bill image with extreme precision. Include:
- Patient name, DOB, account numbers
- Provider/hospital name and address
- Service dates
- EVERY itemized charge with: date, description, CPT/REV/NDC code, quantity, and ALL dollar amounts (Charges, Allowed, Insurance Paid, Patient Resp)
- Total charges, insurance payments, patient responsibility
- Any notes about denials or authorizations

Be thorough - extract every line item and every number exactly as shown.`
            },
            {
              type: "image_url",
              image_url: { url: base64Image }
            }
          ]
        }
      ],
      max_tokens: 4000
    });
    
    if (onProgress) onProgress(90);
    
    const extractedText = response.choices[0].message.content;
    
    console.log('=== OCR COMPLETE ===');
    console.log('Length:', extractedText.length);
    console.log('Preview:', extractedText.substring(0, 300));
    
    if (onProgress) onProgress(100);
    
    return {
      text: extractedText,
      confidence: 95,
      method: 'gpt-4o-vision'
    };
    
  } catch (error) {
    console.error('OCR ERROR:', error);
    if (onProgress) onProgress(100);
    return {
      text: 'OCR failed',
      confidence: 0,
      method: 'error',
      error: error.message
    };
  }
}

async function extractTextFromPDF(file, onProgress) {
  try {
    console.log('Reading PDF file...');
    
    // Read PDF file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    
    if (onProgress) onProgress(20);
    
    // Load PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    console.log('PDF loaded, pages:', pdf.numPages);
    
    if (onProgress) onProgress(30);
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine text items
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      
      fullText += pageText + '\n\n';
      
      // Update progress
      const progress = 30 + Math.floor((pageNum / pdf.numPages) * 60);
      if (onProgress) onProgress(progress);
      
      console.log(`Page ${pageNum}/${pdf.numPages} extracted`);
    }
    
    console.log('=== PDF TEXT EXTRACTION COMPLETE ===');
    console.log('Total text length:', fullText.length);
    console.log('Preview:', fullText.substring(0, 500));
    
    if (onProgress) onProgress(100);
    
    // If we got very little text, the PDF might be scanned images
    if (fullText.length < 100) {
      console.warn('Low text extracted - PDF might be scanned images');
      return {
        text: fullText || 'PDF appears to be scanned images with no extractable text',
        confidence: 20,
        method: 'pdf-text-low'
      };
    }
    
    return {
      text: fullText,
      confidence: 85,
      method: 'pdf-text-extraction'
    };
    
  } catch (error) {
    console.error('PDF extraction error:', error);
    return {
      text: 'PDF extraction failed: ' + error.message,
      confidence: 0,
      method: 'pdf-error',
      error: error.message
    };
  }
}

function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}

export function cleanExtractedText(text) {
  if (!text) return '';
  return text.replace(/\s+/g, ' ').trim();
}

export function extractBillPatterns() {
  return { dates: [], amounts: [], codes: [], accountNumbers: [] };
}
