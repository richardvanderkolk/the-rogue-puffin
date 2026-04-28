-- Run this script in your Supabase SQL Editor to create the page_views table for tracking Most Read content

CREATE TABLE IF NOT EXISTS public.page_views (
    path TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create a hyper-fast, atomic Postgres procedure to instantly upsert and increment the views count
CREATE OR REPLACE FUNCTION increment_page_view(p_path text, p_title text, p_category text)
RETURNS void AS $$
BEGIN
    INSERT INTO public.page_views (path, title, category, views, updated_at)
    VALUES (p_path, p_title, p_category, 1, now())
    ON CONFLICT (path)
    DO UPDATE SET 
        views = public.page_views.views + 1,
        title = EXCLUDED.title,
        updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- Note: Because this analytics tracking table is exclusively updated via our protected Next.js backend API using the Service Role Key, 
-- we do not need to enable public RLS policies. The Service Role key bypasses RLS natively.
