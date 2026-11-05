export const RATES_CONFIG = {
  // Netherlands Transfer Tax (Overdrachtsbelasting) rates
  transferTax: {
    starterExemptionCap: 510000, // EUR (Starter exemption threshold in NL)
    starterRate: 0.0, // 0% for qualified first-time buyers under cap and aged 18-35
    ownerOccupierRate: 0.02, // 2% for primary residence buyers
    investorRate: 0.104, // 10.4% for buy-to-let, commercial, secondary homes
  },
  // Buying additional costs default estimates in EUR
  closingCosts: {
    notaryFee: 1850,
    cadastralFee: 180,
    valuationFee: 850,
    mortgageAdvisoryFee: 2450,
    structuralSurveyFee: 550,
    interpreterFee: 350,
  },
  // Default mortgage parameters
  mortgageDefaults: {
    interestRatePercent: 3.85,
    termYears: 30,
    minDownPaymentPercent: 0,
    maxLtvPercent: 100, // NL allows up to 100% of property market value
  },
};
