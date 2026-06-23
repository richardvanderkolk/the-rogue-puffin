import { NextResponse } from 'next/server';
import { getCurrencyInfo } from '@/lib/currency';

export async function GET(request: Request) {
    const countryCode = request.headers.get('x-vercel-ip-country');
    const currencyInfo = getCurrencyInfo(countryCode);
    return NextResponse.json(currencyInfo);
}
