// Common CPT (Current Procedural Terminology) Codes
export const cptCodes = {
    // Office Visits
    '99201': 'Office visit, new patient, minimal',
    '99202': 'Office visit, new patient, low complexity',
    '99203': 'Office visit, new patient, moderate complexity',
    '99204': 'Office visit, new patient, high complexity',
    '99205': 'Office visit, new patient, very high complexity',
    '99211': 'Office visit, established patient, minimal',
    '99212': 'Office visit, established patient, low complexity',
    '99213': 'Office visit, established patient, moderate complexity',
    '99214': 'Office visit, established patient, high complexity',
    '99215': 'Office visit, established patient, very high complexity',
    
    // Emergency Department
    '99281': 'Emergency dept visit, minimal',
    '99282': 'Emergency dept visit, low complexity',
    '99283': 'Emergency dept visit, moderate complexity',
    '99284': 'Emergency dept visit, high complexity',
    '99285': 'Emergency dept visit, very high complexity',
    
    // Laboratory Tests
    '80053': 'Comprehensive metabolic panel',
    '80061': 'Lipid panel',
    '82947': 'Glucose, blood test',
    '83036': 'Hemoglobin A1C level',
    '84443': 'Thyroid stimulating hormone (TSH)',
    '85025': 'Complete blood count (CBC) with differential',
    '85027': 'Complete blood count (CBC)',
    '86900': 'Blood typing, ABO',
    '87040': 'Blood culture',
    '87070': 'Culture, bacterial (any source)',
    '87086': 'Urine culture',
    
    // Radiology
    '70450': 'CT scan head/brain without contrast',
    '70460': 'CT scan head/brain with contrast',
    '70486': 'CT scan face without contrast',
    '70551': 'MRI brain without contrast',
    '71045': 'Chest X-ray, single view',
    '71046': 'Chest X-ray, 2 views',
    '71250': 'CT scan chest without contrast',
    '72148': 'MRI lumbar spine without contrast',
    '73030': 'X-ray shoulder, 2 views',
    '73610': 'X-ray ankle, 3 views',
    '74160': 'CT scan abdomen with contrast',
    '74177': 'CT scan abdomen and pelvis with contrast',
    '76700': 'Ultrasound, abdominal',
    '76805': 'Ultrasound, pregnant uterus',
    
    // Procedures
    '10060': 'Incision and drainage of abscess',
    '11042': 'Debridement of skin, 20 sq cm or less',
    '12001': 'Simple repair of superficial wounds, 2.5 cm or less',
    '20610': 'Arthrocentesis (joint drainage)',
    '29125': 'Application of short arm splint',
    '31575': 'Laryngoscopy, flexible',
    '43235': 'Upper GI endoscopy',
    '45378': 'Colonoscopy, diagnostic',
    '45380': 'Colonoscopy with biopsy',
    '93000': 'Electrocardiogram (EKG/ECG), complete',
    '94060': 'Spirometry (lung function test)',
    '96372': 'Therapeutic injection, subcutaneous or intramuscular',
    '97110': 'Therapeutic exercises',
    
    // Anesthesia
    '00142': 'Anesthesia for procedures on eye',
    '00400': 'Anesthesia for procedures on the integumentary system',
    '00790': 'Anesthesia for intraperitoneal procedures',
    
    // Surgery
    '19307': 'Mastectomy, modified radical',
    '27447': 'Total knee arthroplasty',
    '27702': 'Arthroplasty, ankle',
    '43644': 'Laparoscopic gastric bypass',
    '47562': 'Laparoscopic cholecystectomy',
    '49505': 'Inguinal hernia repair',
  };
  
  // Common ICD-10 (Diagnosis) Codes
  export const icd10Codes = {
    // Symptoms and signs
    'R07.9': 'Chest pain, unspecified',
    'R10.9': 'Abdominal pain, unspecified',
    'R50.9': 'Fever, unspecified',
    'R51.9': 'Headache, unspecified',
    'R53.83': 'Fatigue',
    
    // Cardiovascular
    'I10': 'Essential (primary) hypertension',
    'I25.10': 'Coronary artery disease',
    'I48.91': 'Atrial fibrillation',
    'I50.9': 'Heart failure, unspecified',
    
    // Respiratory
    'J01.90': 'Acute sinusitis, unspecified',
    'J02.9': 'Acute pharyngitis, unspecified',
    'J06.9': 'Acute upper respiratory infection',
    'J18.9': 'Pneumonia, unspecified',
    'J20.9': 'Acute bronchitis, unspecified',
    'J44.9': 'COPD, unspecified',
    'J45.909': 'Asthma, unspecified',
    
    // Metabolic/Endocrine
    'E11.9': 'Type 2 diabetes mellitus without complications',
    'E11.65': 'Type 2 diabetes with hyperglycemia',
    'E03.9': 'Hypothyroidism, unspecified',
    'E66.9': 'Obesity, unspecified',
    'E78.5': 'Hyperlipidemia, unspecified',
    
    // Gastrointestinal
    'K21.9': 'Gastro-esophageal reflux disease',
    'K29.70': 'Gastritis, unspecified',
    'K59.00': 'Constipation, unspecified',
    'K76.0': 'Fatty liver',
    
    // Musculoskeletal
    'M25.50': 'Pain in unspecified joint',
    'M54.5': 'Low back pain',
    'M79.3': 'Panniculitis, unspecified',
    
    // Mental health
    'F32.9': 'Major depressive disorder, single episode',
    'F41.1': 'Generalized anxiety disorder',
    'F41.9': 'Anxiety disorder, unspecified',
    
    // Injuries
    'S06.0X0A': 'Concussion without loss of consciousness',
    'S93.40': 'Sprain of ankle',
    'T14.90': 'Injury, unspecified',
    
    // Pregnancy
    'O80': 'Encounter for full-term uncomplicated delivery',
    'Z34.90': 'Encounter for supervision of normal pregnancy',
  };
  
  // Validate if a code exists and is properly formatted
  export function validateCPTCode(code) {
    if (!code) return { valid: false, message: 'Code is required' };
    
    // CPT codes are 5 digits
    if (!/^\d{5}$/.test(code)) {
      return { valid: false, message: 'CPT codes must be exactly 5 digits' };
    }
    
    const exists = code in cptCodes;
    return {
      valid: exists,
      message: exists ? 'Valid CPT code' : 'Code not found in database',
      description: exists ? cptCodes[code] : null
    };
  }
  
  export function validateICD10Code(code) {
    if (!code) return { valid: false, message: 'Code is required' };
    
    // ICD-10 codes start with a letter followed by 2 digits, then optional decimal and more chars
    if (!/^[A-Z]\d{2}/.test(code)) {
      return { valid: false, message: 'ICD-10 codes must start with a letter followed by 2 digits' };
    }
    
    const exists = code in icd10Codes;
    return {
      valid: exists,
      message: exists ? 'Valid ICD-10 code' : 'Code not found in database',
      description: exists ? icd10Codes[code] : null
    };
  }
  
  export function validateMedicalCode(code, codeType) {
    if (!code || !codeType) {
      return { valid: false, message: 'Code and code type are required' };
    }
    
    switch (codeType.toUpperCase()) {
      case 'CPT':
        return validateCPTCode(code);
      case 'ICD':
      case 'ICD-10':
      case 'ICD10':
        return validateICD10Code(code);
      default:
        return { valid: false, message: 'Unknown code type' };
    }
  }
  
  export function getCodeDescription(code, codeType) {
    if (codeType === 'CPT') {
      return cptCodes[code] || 'Unknown CPT code';
    } else if (codeType === 'ICD' || codeType === 'ICD-10') {
      return icd10Codes[code] || 'Unknown ICD-10 code';
    }
    return 'Unknown code';
  }