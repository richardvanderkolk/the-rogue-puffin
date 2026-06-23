-- SQL Commands to initialize Community Discoveries Hub
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)

-- 1. Create discoveries table
CREATE TABLE IF NOT EXISTS public.discoveries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users NOT NULL,
    title text NOT NULL,
    subject text NOT NULL DEFAULT 'General',
    description text NOT NULL,
    resource_url text,
    author_name text NOT NULL,
    author_style text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create discovery_ratings table
CREATE TABLE IF NOT EXISTS public.discovery_ratings (
    discovery_id uuid REFERENCES public.discoveries ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    voter_style text NOT NULL,
    rating text NOT NULL CHECK (rating IN ('helpful', 'unhelpful')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (discovery_id, user_id)
);

-- 3. Enable RLS on discoveries
ALTER TABLE public.discoveries ENABLE ROW LEVEL SECURITY;

-- 4. Enable RLS on discovery_ratings
ALTER TABLE public.discovery_ratings ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for discoveries
DROP POLICY IF EXISTS "Discoveries are viewable by everyone." ON public.discoveries;
CREATE POLICY "Discoveries are viewable by everyone." ON public.discoveries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert their own discoveries." ON public.discoveries;
CREATE POLICY "Authenticated users can insert their own discoveries." ON public.discoveries FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own discoveries." ON public.discoveries;
CREATE POLICY "Users can update their own discoveries." ON public.discoveries FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own discoveries." ON public.discoveries;
CREATE POLICY "Users can delete their own discoveries." ON public.discoveries FOR DELETE USING (auth.uid() = user_id);

-- 6. Create RLS Policies for discovery_ratings
DROP POLICY IF EXISTS "Discovery ratings are viewable by everyone." ON public.discovery_ratings;
CREATE POLICY "Discovery ratings are viewable by everyone." ON public.discovery_ratings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can rate discoveries." ON public.discovery_ratings;
CREATE POLICY "Authenticated users can rate discoveries." ON public.discovery_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own ratings." ON public.discovery_ratings;
CREATE POLICY "Users can update their own ratings." ON public.discovery_ratings FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own ratings." ON public.discovery_ratings;
CREATE POLICY "Users can delete their own ratings." ON public.discovery_ratings FOR DELETE USING (auth.uid() = user_id);

-- 7. Add helper indexes for performance
CREATE INDEX IF NOT EXISTS idx_discoveries_user_id ON public.discoveries(user_id);
CREATE INDEX IF NOT EXISTS idx_discovery_ratings_discovery_id ON public.discovery_ratings(discovery_id);

-- 8. Migration: Add subject column to discoveries if it does not already exist
ALTER TABLE public.discoveries ADD COLUMN IF NOT EXISTS subject text NOT NULL DEFAULT 'General';
