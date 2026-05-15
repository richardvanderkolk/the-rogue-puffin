import { ImageResponse } from 'next/og';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';
export const alt = 'The Rogue Puffin Article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: article } = await supabase
        .from('articles')
        .select('title, category')
        .eq('slug', slug)
        .single();

    const title = article?.title || 'The Rogue Puffin Archive';
    const category = article?.category || 'Learning Mastery';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: '#020617',
                    backgroundImage: 'linear-gradient(to bottom right, #020617, #1e1b4b)',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        color: '#a5b4fc',
                        fontSize: 32,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '20px',
                        fontWeight: 'bold',
                    }}
                >
                    {category}
                </div>
                <div
                    style={{
                        color: 'white',
                        fontSize: 80,
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: '40px',
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 'auto',
                    }}
                >
                    <div
                        style={{
                            color: '#6366f1',
                            fontSize: 36,
                            fontWeight: 'bold',
                        }}
                    >
                        The Rogue Puffin
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
