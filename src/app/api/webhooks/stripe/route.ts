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
        
        const customerEmail = session.customer_details?.email || session.metadata?.email;
        const productMode = session.metadata?.productMode;

        if (customerEmail && productMode) {
            console.log(`Fulfilling purchase for ${customerEmail} - ${productMode}`);
            const userId = session.client_reference_id || session.metadata?.user_id;

            // Record the purchase in the purchases table for analytics dashboard
            const { error: purchaseError } = await supabase
                .from('purchases')
                .insert([{
                    email: customerEmail,
                    product: productMode,
                    stripe_session_id: session.id,
                    amount_total: session.amount_total || 0,
                    currency: session.currency || 'usd'
                }]);
            if (purchaseError) {
                console.error("Error inserting purchase record in webhook:", purchaseError);
            }

            if (productMode === 'bootcamp' || productMode === 'complete_masterclass_bundle') {
                if (userId) {
                    const { error } = await supabase
                        .from('profiles')
                        .update({ has_paid_bootcamp: true })
                        .eq('id', userId);
                    if (error) console.error("Error updating profile for bootcamp purchase:", error);
                } else {
                    const { error } = await supabase
                        .from('profiles')
                        .update({ has_paid_bootcamp: true })
                        .eq('email', customerEmail);
                    if (error) console.error("Error updating profile by email for bootcamp purchase:", error);
                }
            } else if (productMode === 'mastery_subscription') {
                const customerId = session.customer as string;
                const subscriptionId = session.subscription as string;
                
                if (userId) {
                    const { error } = await supabase
                        .from('profiles')
                        .update({
                            subscription_tier: 'mastery',
                            stripe_customer_id: customerId,
                            stripe_subscription_id: subscriptionId,
                            subscription_status: 'active'
                        })
                        .eq('id', userId);
                    if (error) console.error("Error updating profile for subscription purchase:", error);
                } else {
                    const { error } = await supabase
                        .from('profiles')
                        .update({
                            subscription_tier: 'mastery',
                            stripe_customer_id: customerId,
                            stripe_subscription_id: subscriptionId,
                            subscription_status: 'active'
                        })
                        .eq('email', customerEmail);
                    if (error) console.error("Error updating profile by email for subscription purchase:", error);
                }
            }
        }
    }

    return NextResponse.json({ received: true });
}
