import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
    try {
        const { path, title, category } = await req.json();

        if (!path || !title || !category) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const { error } = await supabase.rpc('increment_page_view', {
            p_path: path,
            p_title: title,
            p_category: category
        });

        if (error) {
            console.error("View Tracker RPC Error:", error);
            // Non-blocking fallback return just in case the SQL script hasn't been executed by the user yet
            return NextResponse.json({ success: false, error: error.message }, { status: 200 }); 
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const passkey = searchParams.get('passkey');

    if (passkey !== 'thepuffin2024!') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data, error } = await supabase
            .from('page_views')
            .select('*')
            .order('views', { ascending: false })
            .limit(10);

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
