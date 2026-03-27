-- Run this script in your Supabase SQL Editor to create the articles table for the Admin CMS

CREATE TABLE IF NOT EXISTS public.articles (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Reading articles should be public for the frontend (unless published is false, which the frontend API logic handles, or we enforce here)
CREATE POLICY "Allow public read access to articles" ON public.articles
    FOR SELECT
    TO public
    USING (true);

-- Admins will use the Service Role Key or an authenticated session to INSERT/UPDATE/DELETE. 
-- Service Role bypasses RLS naturally, so no explicit policy is needed for the script or backend API.
