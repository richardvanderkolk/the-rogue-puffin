import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getCurrencyInfo } from '@/lib/currency';

// Provide a dummy test key as fallback so Vercel Next.js build doesn't crash statically analyzing the file
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_123';

async function createCheckoutSession(request: Request, productMode: string, email?: string, visitorId?: string) {
    if (!stripeKey) {
        console.error("Missing STRIPE_SECRET_KEY");
        throw new Error('Stripe configuration error');
    }

    const stripe = new Stripe(stripeKey, {
        apiVersion: '2026-03-25.dahlia', // using latest compatible API version
    });

    const countryCode = request.headers.get('x-vercel-ip-country');
    const { currency } = getCurrencyInfo(countryCode);

    let priceData;
    if (productMode === 'complete_masterclass_bundle') {
        priceData = {
            currency,
            product_data: {
                name: 'The Complete Masterclass Bundle',
                description: 'Full Lifetime Access: Fast Reading Bootcamp, Memory Simulator, and Digital Textbook.',
            },
            unit_amount: 7500, // $75.00
        };
    } else if (productMode === 'masterclass') {
        priceData = {
            currency,
            product_data: {
                name: 'The Rogue Puffin Masterclass',
                description: 'Full Lifetime Access to the Reading Speed Trainer and Courses',
            },
            unit_amount: 1000, // $10.00
        };
    } else if (productMode === 'rogue-session') {
        priceData = {
            currency,
            product_data: {
                name: 'The Rogue Session',
                description: '30-Minute Precision Reading Speed Drill',
            },
            unit_amount: 500, // $5.00
        };
    } else if (productMode === 'bootcamp') {
        priceData = {
            currency,
            product_data: {
                name: '14-Day Cognitive Bootcamp',
                description: 'Unlock Days 2-14: Discover your superpower, memory protocols, and full mastery.',
            },
            unit_amount: 2900, // $29.00
        };
    } else {
        throw new Error('Invalid product mode');
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: email || undefined,
        allow_promotion_codes: true,
        line_items: [
            {
                price_data: priceData,
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: productMode === 'bootcamp' ? `${baseUrl}/bootcamp?success=true` : 
                     productMode === 'rogue-session' ? `${baseUrl}/rogue-session/start?success=true` : 
                     `${baseUrl}/train/sales?success=true`,
        cancel_url: productMode === 'rogue-session' ? `${baseUrl}/rogue-session?canceled=true` : `${baseUrl}/train/sales?canceled=true`,
        metadata: {
            productMode,
            visitor_id: visitorId || ''
        }
    });

    return session;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { productMode, email, visitor_id } = body; 
        const session = await createCheckoutSession(request, productMode, email, visitor_id);
        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error("Stripe Checkout POST Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const productId = url.searchParams.get('productId');
        const visitorId = url.searchParams.get('visitor_id') || undefined;
        if (!productId) {
            return NextResponse.json({ error: "Missing productId" }, { status: 400 });
        }
        
        const session = await createCheckoutSession(request, productId, undefined, visitorId);
        if (session.url) {
            return NextResponse.redirect(session.url);
        } else {
            return NextResponse.json({ error: "No session url generated." }, { status: 500 });
        }
    } catch (err: any) {
         console.error("Stripe Checkout GET Error:", err);
         // Redirect back to masterclass on failure
         const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
         return NextResponse.redirect(`${baseUrl}/masterclass`);
    }
}
