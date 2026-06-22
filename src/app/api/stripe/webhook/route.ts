import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_123';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
    if (!stripeKey) {
        return NextResponse.json({ error: 'Stripe configuration error' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey, {
        apiVersion: '2026-03-25.dahlia',
    });

    const body = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        if (!webhookSecret) {
            console.warn("No STRIPE_WEBHOOK_SECRET provided. Skipping signature verification.");
            event = JSON.parse(body);
        } else {
            event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
        }
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.client_reference_id || session.metadata?.user_id;
                const customerEmail = session.customer_details?.email || session.metadata?.email;
                const productMode = session.metadata?.productMode;
                const customerId = session.customer as string;

                if (productMode === 'bootcamp' || productMode === 'complete_masterclass_bundle') {
                    if (userId) {
                        const { error } = await supabase
                            .from('profiles')
                            .update({ has_paid_bootcamp: true })
                            .eq('id', userId);
                        if (error) console.error("Failed to update profile for bootcamp purchase:", error);
                    } else if (customerEmail) {
                        const { error } = await supabase
                            .from('profiles')
                            .update({ has_paid_bootcamp: true })
                            .eq('email', customerEmail);
                        if (error) console.error("Failed to update profile by email for bootcamp purchase:", error);
                    }
                } else if (productMode === 'mastery_subscription' || session.mode === 'subscription') {
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
                        if (error) console.error("Failed to update profile after checkout:", error);
                    } else if (customerEmail) {
                        const { error } = await supabase
                            .from('profiles')
                            .update({
                                subscription_tier: 'mastery',
                                stripe_customer_id: customerId,
                                stripe_subscription_id: subscriptionId,
                                subscription_status: 'active'
                            })
                            .eq('email', customerEmail);
                        if (error) console.error("Failed to update profile by email after checkout:", error);
                    }
                }
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;
                const status = subscription.status;

                const { error } = await supabase
                    .from('profiles')
                    .update({
                        subscription_status: status,
                        subscription_tier: status === 'active' || status === 'trialing' ? 'mastery' : 'free'
                    })
                    .eq('stripe_customer_id', customerId);

                if (error) console.error("Failed to update profile subscription status:", error);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const { error } = await supabase
                    .from('profiles')
                    .update({
                        subscription_status: 'canceled',
                        subscription_tier: 'free'
                    })
                    .eq('stripe_customer_id', customerId);

                if (error) console.error("Failed to cancel profile subscription:", error);
                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (err: any) {
        console.error(`Webhook processing error: ${err.message}`);
        return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
