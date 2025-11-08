import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function extractTextFromFile(file, onProgress) {
  try {
    console.log('=== OCR START ===');
    console.log('File:', file.name, 'Type:', file.type);
    
    if (onProgress) onProgress(10);
    
    if (file.type === 'application/pdf') {
      console.log('PDF - skipping Vision API');
      if (onProgress) onProgress(100);
      return {
        text: 'PDF - text extraction not supported',
        confidence: 0,
        method: 'pdf-skip'
      };
    }
    
    console.log('Converting to base64...');
    const base64Image = await convertFileToBase64(file);
    
    if (onProgress) onProgress(30);
    
    console.log('Calling GPT-4o for better extraction...');
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using full GPT-4o for better accuracy
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