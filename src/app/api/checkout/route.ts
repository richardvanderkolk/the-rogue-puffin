import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Provide a dummy test key as fallback so Vercel Next.js build doesn't crash statically analyzing the file
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_123';

export async function POST(request: Request) {
    try {
        if (!stripeKey) {
            console.error("Missing STRIPE_SECRET_KEY");
            return NextResponse.json({ error: 'Stripe configuration error' }, { status: 500 });
        }

        const stripe = new Stripe(stripeKey, {
            apiVersion: '2026-03-25.dahlia', // using latest compatible API version
        });

        const body = await request.json();
        const { productMode, email } = body; 

        let priceData;
        if (productMode === 'masterclass') {
            priceData = {
                currency: 'usd',
                product_data: {
                    name: 'The Rogue Puffin Masterclass',
                    description: 'Full Lifetime Access to the Reading Speed Trainer and Courses',
                },
                unit_amount: 1000, // $10.00
            };
        } else if (productMode === 'rogue-session') {
            priceData = {
                currency: 'usd',
                product_data: {
                    name: 'The Rogue Session',
                    description: '30-Minute Precision Reading Speed Drill',
                },
                unit_amount: 500, // $5.00
            };
        } else {
            return NextResponse.json({ error: 'Invalid product mode' }, { status: 400 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email || undefined,
            line_items: [
                {
                    price_data: priceData,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${baseUrl}/train/sales?success=true`,
            cancel_url: `${baseUrl}/train/sales?canceled=true`,
            metadata: {
                productMode
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error("Stripe Checkout Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
