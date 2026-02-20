import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { userId, wpm, comprehension, type } = await req.json();

        // 1. Insert into benchmarks
        const { error } = await supabase
            .from('benchmarks')
            .insert({
                user_id: userId,
                wpm,
                comprehension_score: comprehension,
                test_type: type
            });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
