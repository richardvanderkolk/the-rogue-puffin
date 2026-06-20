-- RUN THIS IN YOUR SUPABASE SQL EDITOR (https://supabase.com)
-- This alters the purchases table to support tracking payment currency.

ALTER TABLE public.purchases ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'usd';
