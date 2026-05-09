import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    try {
        const { visitor_id, primary_style, secondary_style, tertiary_style } = await request.json();

        if (!primary_style) {
            return NextResponse.json({ error: 'Primary style is required' }, { status: 400 });
        }

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({ success: true, warning: 'Supabase Env Vars missing, simulating success.' });
        }

        const { data, error } = await supabase
            .from('learning_style_tests')
            .insert([{ visitor_id, primary_style, secondary_style, tertiary_style }]);

        if (error) {
            console.error("Learning Style Insert Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (err: any) {
        console.error("Learning Style API Error:", err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
