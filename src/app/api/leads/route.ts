import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Fallback to anon key if service role is missing, but service role is preferred for server bypass
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const { email, wpm, comprehension } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!supabaseUrl || !supabaseKey) {
            console.error("Missing Supabase Environment Variables");
            // If they are missing env vars in local dev, just simulate success so the flow doesn't break
            return NextResponse.json({ success: true, warning: 'Supabase Env Vars missing, simulating success.' });
        }

        // We use upsert so if the same email tests twice, we just update their latest score
        const { data, error } = await supabase
            .from('leads')
            .upsert(
                { 
                    email, 
                    wpm_score: wpm, 
                    comprehension_score: comprehension,
                    updated_at: new Date().toISOString()
                }, 
                { onConflict: 'email' }
            );

        if (error) {
            console.error("Supabase Insert Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (err: any) {
        console.error("Lead Capture API Error:", err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
