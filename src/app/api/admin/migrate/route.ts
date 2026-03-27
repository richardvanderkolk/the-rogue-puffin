import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { articles } from '@/data/articles';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET() {
    try {
        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({ error: 'Missing Supabase Config' }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        const payload = articles.map(a => ({
            slug: a.slug,
            title: a.title,
            category: a.category,
            excerpt: a.excerpt,
            content: a.content,
            published: a.published || false,
            updated_at: new Date().toISOString()
        }));

        const { data, error } = await supabase
            .from('articles')
            .upsert(payload, { onConflict: 'slug' });

        if (error) {
            console.error("Migration Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, migrated_count: payload.length });
    } catch (err: any) {
        console.error("Migration API Error:", err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
