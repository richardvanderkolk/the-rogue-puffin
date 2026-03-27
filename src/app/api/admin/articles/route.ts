import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (!supabaseUrl) return NextResponse.json({ error: 'Missing DB string' }, { status: 500 });

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function PUT(req: Request) {
    const { passkey, article } = await req.json();
    
    // Simple hardcoded passkey for now (can be moved to .env later)
    if (passkey !== "thepuffin2024!") {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    // Must use service role to bypass RLS for updates
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from('articles').update({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        category: article.category,
        published: article.published,
        updated_at: new Date().toISOString()
    }).eq('slug', article.slug);

    if (error) {
        console.error("CMS Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
