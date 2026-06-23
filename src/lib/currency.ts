export function getCurrencyInfo(countryCode: string | null) {
  const gbpCountries = ['GB'];
  const audCountries = ['AU'];
  const eurCountries = [
    'AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 
    'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'HR',
    'AD', 'MC', 'SM', 'VA', 'ME', 'XK'
  ];

  if (!countryCode) return { currency: 'usd', symbol: '$' };
  
  const code = countryCode.toUpperCase();

  if (gbpCountries.includes(code)) {
    return { currency: 'gbp', symbol: '£' };
  }
  
  if (eurCountries.includes(code)) {
    return { currency: 'eur', symbol: '€' };
  }

  if (audCountries.includes(code)) {
    return { currency: 'aud', symbol: 'AU$' };
  }
  
  return { currency: 'usd', symbol: '$' };
}
