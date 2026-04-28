export function getCurrencyInfo(countryCode: string | null) {
  const gbpCountries = ['GB'];
  const eurCountries = [
    'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 
    'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'
  ];

  if (!countryCode) return { currency: 'usd', symbol: '$' };
  
  const code = countryCode.toUpperCase();

  if (gbpCountries.includes(code)) {
    return { currency: 'gbp', symbol: '£' };
  }
  
  if (eurCountries.includes(code)) {
    return { currency: 'eur', symbol: '€' };
  }
  
  return { currency: 'usd', symbol: '$' };
}
