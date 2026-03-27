-- Run this script in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    wpm_score INTEGER,
    comprehension_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- If you are using the NEXT_PUBLIC_SUPABASE_ANON_KEY to insert from the API, 
-- you must create an INSERT policy so the API can insert records:
CREATE POLICY "Allow anonymous inserts" ON public.leads
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Allow upserts (updates) on existing emails from anon
CREATE POLICY "Allow anonymous updates" ON public.leads
    FOR UPDATE 
    TO anon
    USING (true);
