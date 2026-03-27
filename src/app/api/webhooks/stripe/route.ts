import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Provide a dummy test key as fallback to allow Vercel to statically compile the route
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_123', {
    apiVersion: '2026-03-25.dahlia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
    if (!endpointSecret) {
        console.error("Stripe Webhook Secret not configured");
        return NextResponse.json({ error: 'Webhook Secret configuration error' }, { status: 500 });
    }

    const payload = await request.text();
    const sig = request.headers.get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        
        const customerEmail = session.customer_details?.email;
        const productMode = session.metadata?.productMode;

        if (customerEmail && productMode) {
            console.log(`Fulfilling purchase for ${customerEmail} - ${productMode}`);
            
            // Here you would insert a record into a `purchases` or `users` table to grant access
            // Using service role to bypass RLS
            const { error } = await supabase
                .from('purchases')
                .insert({
                    email: customerEmail,
                    product: productMode,
                    stripe_session_id: session.id,
                    amount_total: session.amount_total,
                });

            if (error) {
                console.error("Error granting access in Supabase:", error);
                // Return 200 anyway so Stripe doesn't continually retry a DB-related failure
                // In production, consider queuing this or alerting admin
            }
        }
    }

    return NextResponse.json({ received: true });
}
