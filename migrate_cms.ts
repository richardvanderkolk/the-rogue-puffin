import { createClient } from '@supabase/supabase-js';
import { articles } from './src/data/articles';
import * as fs from 'fs';

// Manually parse .env.local to avoid dependency on Node 20+ --env-file
const envFile = fs.readFileSync('.env.local', 'utf8');
const env: Record<string, string> = {};
envFile.split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length > 0) env[key.trim()] = vals.join('=').trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error("Could not find Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log(`Starting migration of ${articles.length} articles to Supabase...`);
    
    const payload = articles.map(a => ({
        slug: a.slug,
        title: a.title,
        category: a.category,
        excerpt: a.excerpt,
        content: a.content,
        published: a.published || false,
        updated_at: new Date().toISOString()
    }));

    // Chunk the uploads to prevent payload too large errors
    const chunkSize = 20;
    for (let i = 0; i < payload.length; i += chunkSize) {
        const chunk = payload.slice(i, i + chunkSize);
        console.log(`Uploading chunk ${i / chunkSize + 1} of ${Math.ceil(payload.length / chunkSize)}...`);
        const { error } = await supabase.from('articles').upsert(chunk, { onConflict: 'slug' });
        
        if (error) {
            console.error("Error migrating chunk:", error);
            process.exit(1);
        }
    }

    console.log("✅ Successfully migrated all articles to Supabase CMS!");
}

run();
