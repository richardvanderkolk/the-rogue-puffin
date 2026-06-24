import { NextResponse } from 'next/server';
import { getCurrencyInfo, getCurrencyInfoByTimezone } from '@/lib/currency';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tz = searchParams.get('tz');
    const countryCode = request.headers.get('x-vercel-ip-country');
    
    let currencyInfo = getCurrencyInfo(countryCode);
    
    if ((!countryCode || currencyInfo.currency === 'usd') && tz) {
        const tzInfo = getCurrencyInfoByTimezone(tz);
        if (tzInfo) {
            currencyInfo = tzInfo;
        }
    }
    
    return NextResponse.json(currencyInfo);
}
