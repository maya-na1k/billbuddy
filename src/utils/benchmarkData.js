// Medicare benchmark prices for common procedures (2024 data)
// Prices are based on national averages and may vary by region

export const benchmarkPrices = {
    // Office Visits - CPT Codes
    '99201': { median: 46.00, min: 35, max: 75, description: 'Office visit, new patient, minimal' },
    '99202': { median: 77.00, min: 60, max: 110, description: 'Office visit, new patient, low complexity' },
    '99203': { median: 111.00, min: 90, max: 160, description: 'Office visit, new patient, moderate' },
    '99204': { median: 169.00, min: 130, max: 240, description: 'Office visit, new patient, high complexity' },
    '99205': { median: 224.00, min: 180, max: 320, description: 'Office visit, new patient, very high complexity' },
    '99211': { median: 23.00, min: 18, max: 40, description: 'Office visit, established patient, minimal' },
    '99212': { median: 56.00, min: 45, max: 85, description: 'Office visit, established patient, low' },
    '99213': { median: 92.00, min: 75, max: 130, description: 'Office visit, established patient, moderate' },
    '99214': { median: 131.00, min: 105, max: 185, description: 'Office visit, established patient, high' },
    '99215': { median: 184.00, min: 150, max: 260, description: 'Office visit, established patient, very high' },
    
    // Emergency Department
    '99281': { median: 51.00, min: 40, max: 80, description: 'Emergency dept visit, minimal' },
    '99282': { median: 93.00, min: 75, max: 130, description: 'Emergency dept visit, low complexity' },
    '99283': { median: 142.00, min: 115, max: 200, description: 'Emergency dept visit, moderate' },
    '99284': { median: 229.00, min: 185, max: 320, description: 'Emergency dept visit, high complexity' },
    '99285': { median: 344.00, min: 280, max: 480, description: 'Emergency dept visit, very high complexity' },
    
    // Laboratory Tests
    '80053': { median: 14.39, min: 10, max: 30, description: 'Comprehensive metabolic panel' },
    '80061': { median: 16.00, min: 12, max: 35, description: 'Lipid panel' },
    '82947': { median: 7.00, min: 5, max: 15, description: 'Glucose, blood test' },
    '83036': { median: 12.00, min: 8, max: 25, description: 'Hemoglobin A1C' },
    '84443': { median: 25.00, min: 18, max: 50, description: 'TSH test' },
    '85025': { median: 10.56, min: 8, max: 22, description: 'Complete blood count with differential' },
    '85027': { median: 8.00, min: 6, max: 18, description: 'Complete blood count' },
    '86900': { median: 8.00, min: 6, max: 15, description: 'Blood typing' },
    '87040': { median: 15.00, min: 12, max: 30, description: 'Blood culture' },
    '87086': { median: 12.00, min: 9, max: 25, description: 'Urine culture' },
    
    // Radiology/Imaging
    '70450': { median: 194.00, min: 150, max: 400, description: 'CT scan head without contrast' },
    '70460': { median: 242.00, min: 190, max: 500, description: 'CT scan head with contrast' },
    '70551': { median: 375.00, min: 300, max: 750, description: 'MRI brain without contrast' },
    '71045': { median: 37.50, min: 25, max: 75, description: 'Chest X-ray, single view' },
    '71046': { median: 42.00, min: 30, max: 85, description: 'Chest X-ray, 2 views' },
    '71250': { median: 220.00, min: 175, max: 450, description: 'CT scan chest without contrast' },
    '72148': { median: 350.00, min: 280, max: 700, description: 'MRI lumbar spine' },
    '73030': { median: 44.00, min: 35, max: 90, description: 'X-ray shoulder' },
    '73610': { median: 42.00, min: 32, max: 85, description: 'X-ray ankle' },
    '74160': { median: 235.00, min: 185, max: 480, description: 'CT scan abdomen with contrast' },
    '74177': { median: 370.00, min: 295, max: 740, description: 'CT scan abdomen and pelvis' },
    '76700': { median: 78.00, min: 60, max: 160, description: 'Ultrasound, abdominal' },
    '76805': { median: 85.00, min: 65, max: 175, description: 'Ultrasound, pregnant uterus' },
    
    // Common Procedures
    '10060': { median: 95.00, min: 75, max: 190, description: 'Incision and drainage of abscess' },
    '12001': { median: 85.00, min: 65, max: 170, description: 'Simple wound repair' },
    '20610': { median: 65.00, min: 50, max: 130, description: 'Joint drainage' },
    '29125': { median: 75.00, min: 60, max: 150, description: 'Arm splint application' },
    '43235': { median: 275.00, min: 220, max: 550, description: 'Upper GI endoscopy' },
    '45378': { median: 350.00, min: 280, max: 700, description: 'Colonoscopy, diagnostic' },
    '45380': { median: 385.00, min: 310, max: 770, description: 'Colonoscopy with biopsy' },
    '93000': { median: 17.00, min: 12, max: 35, description: 'EKG complete' },
    '96372': { median: 22.00, min: 15, max: 45, description: 'Therapeutic injection' },
    
    // Surgery (Facility fees not included - these are professional fees)
    '19307': { median: 1850.00, min: 1500, max: 3700, description: 'Mastectomy, modified radical' },
    '27447': { median: 2100.00, min: 1700, max: 4200, description: 'Total knee replacement' },
    '43644': { median: 2400.00, min: 1900, max: 4800, description: 'Gastric bypass' },
    '47562': { median: 750.00, min: 600, max: 1500, description: 'Laparoscopic cholecystectomy' },
    '49505': { median: 650.00, min: 520, max: 1300, description: 'Hernia repair' },
  };
  
  // Regional price multipliers (adjust benchmark by location)
  export const regionalMultipliers = {
    // High cost areas
    'NY': 1.25,
    'CA': 1.22,
    'MA': 1.20,
    'NJ': 1.18,
    'CT': 1.17,
    'AK': 1.30,
    'HI': 1.28,
    
    // Moderate cost areas
    'WA': 1.10,
    'CO': 1.08,
    'IL': 1.08,
    'MD': 1.10,
    'VA': 1.05,
    'FL': 1.05,
    'OR': 1.10,
    
    // Average/below average cost areas
    'TX': 0.95,
    'AZ': 0.98,
    'GA': 0.97,
    'NC': 0.95,
    'TN': 0.92,
    'OH': 0.94,
    'PA': 1.00,
    'MI': 0.98,
    'MO': 0.90,
    'IN': 0.92,
    'KY': 0.88,
    'AL': 0.87,
    'MS': 0.85,
    'AR': 0.86,
    'OK': 0.88,
    'KS': 0.90,
    'NE': 0.92,
    'IA': 0.90,
    'WV': 0.87,
    'SC': 0.93,
    'LA': 0.90,
    'NM': 0.92,
    'ID': 0.95,
    'MT': 0.95,
    'WY': 0.98,
    'SD': 0.90,
    'ND': 0.92,
    'UT': 0.96,
    'NV': 1.05,
  };
  
  // Get adjusted price based on region
  export function getRegionalPrice(code, stateCode) {
    const benchmark = benchmarkPrices[code];
    if (!benchmark) return null;
    
    const multiplier = regionalMultipliers[stateCode?.toUpperCase()] || 1.0;
    
    return {
      ...benchmark,
      adjustedMedian: Math.round(benchmark.median * multiplier * 100) / 100,
      adjustedMin: Math.round(benchmark.min * multiplier * 100) / 100,
      adjustedMax: Math.round(benchmark.max * multiplier * 100) / 100,
      region: stateCode,
      multiplier: multiplier
    };
  }
  
  // Check if a charge is significantly above benchmark
  export function isOvercharged(code, chargedAmount, stateCode = null, threshold = 1.5) {
    const price = stateCode ? getRegionalPrice(code, stateCode) : benchmarkPrices[code];
    
    if (!price) {
      return {
        isOvercharged: false,
        message: 'No benchmark data available for this code'
      };
    }
    
    const medianPrice = price.adjustedMedian || price.median;
    const maxAcceptable = medianPrice * threshold;
    
    if (chargedAmount > maxAcceptable) {
      const percentOver = Math.round(((chargedAmount / medianPrice) - 1) * 100);
      return {
        isOvercharged: true,
        chargedAmount: chargedAmount,
        benchmark: medianPrice,
        percentOver: percentOver,
        message: `Charge is ${percentOver}% above median benchmark`,
        potentialSavings: Math.round((chargedAmount - medianPrice) * 100) / 100
      };
    }
    
    return {
      isOvercharged: false,
      chargedAmount: chargedAmount,
      benchmark: medianPrice,
      message: 'Charge is within acceptable range'
    };
  }
  
  // Analyze all charges in a bill
  export function analyzeBillCharges(lineItems, stateCode = null) {
    const results = {
      totalCharges: 0,
      totalBenchmark: 0,
      totalPotentialSavings: 0,
      overchargedItems: [],
      validItems: []
    };
    
    lineItems.forEach(item => {
      const charged = parseFloat(item.charge_amount) || 0;
      results.totalCharges += charged;
      
      const analysis = isOvercharged(item.code, charged, stateCode);
      
      if (analysis.benchmark) {
        results.totalBenchmark += analysis.benchmark;
      }
      
      if (analysis.isOvercharged) {
        results.totalPotentialSavings += analysis.potentialSavings || 0;
        results.overchargedItems.push({
          ...item,
          analysis
        });
      } else if (analysis.benchmark) {
        results.validItems.push({
          ...item,
          analysis
        });
      }
    });
    
    return results;
  }