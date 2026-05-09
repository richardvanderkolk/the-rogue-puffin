import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const { visitor_id, wpm, comprehension_score, test_type } = await request.json();

        if (!visitor_id) {
            return NextResponse.json({ error: 'visitor_id is required' }, { status: 400 });
        }

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({ success: true, warning: 'Supabase Env Vars missing, simulating success.' });
        }

        const { data, error } = await supabase
            .from('anonymous_tests')
            .insert([{ visitor_id, wpm, comprehension_score, test_type }]);

        if (error) {
            console.error("Anonymous Test Insert Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (err: any) {
        console.error("Anonymous Test API Error:", err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
