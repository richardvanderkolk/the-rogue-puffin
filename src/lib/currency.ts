export function getCurrencyInfoByTimezone(timezone: string) {
  if (!timezone) return null;
  const tz = timezone.toLowerCase();
  
  if (tz.includes('london') || tz.includes('belfast') || tz.includes('guernsey') || tz.includes('jersey') || tz.includes('isle_of_man')) {
    return { currency: 'gbp', symbol: '£' };
  }
  
  if (tz.includes('europe')) {
    return { currency: 'eur', symbol: '€' };
  }
  
  if (tz.includes('australia') || tz.includes('sydney') || tz.includes('melbourne') || tz.includes('brisbane') || tz.includes('perth') || tz.includes('adelaide') || tz.includes('hobart')) {
    return { currency: 'aud', symbol: 'AU$' };
  }
  
  return null;
}

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
