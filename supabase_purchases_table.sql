-- Create the purchases table to track Stripe Checkout sessions
CREATE TABLE purchases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    product TEXT NOT NULL,
    stripe_session_id TEXT UNIQUE NOT NULL,
    amount_total INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- The backend webhook uses the SERVICE_ROLE_KEY, which completely bypasses RLS.
-- This means we can leave the table completely locked down and secure from the public internet.
