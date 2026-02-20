-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- USER PRODUCTS (Tracks Access)
create type product_tier as enum ('rogue_session', 'rogue_protocol');

create table user_products (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  product_id product_tier not null,
  purchase_date timestamp with time zone default timezone('utc'::text, now()) not null,
  stripe_session_id text,
  is_active boolean default true
);

-- BENCHMARKS (Baseline & Progress Tests)
create table benchmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  wpm integer not null,
  comprehension_score integer not null, -- percentage 0-100
  test_type text not null, -- 'baseline' | 'midpoint' | 'final' | 'rogue_session'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TRAINING SESSIONS (Daily Progress)
create table training_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  day_id integer not null, -- 1 to 14
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  average_wpm integer,
  peak_wpm integer,
  comprehension_score integer
);

-- LEADS (Free Test Captures)
create table leads (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  wpm integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  converted boolean default false
);

-- ORGANIZATIONS (Institutional)
create table organizations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  license_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- COHORTS (Groups within Orgs)
create table cohorts (
  id uuid default uuid_generate_v4() primary key,
  organization_id uuid references organizations(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORG MEMBERS
create table organization_members (
  id uuid default uuid_generate_v4() primary key,
  organization_id uuid references organizations(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  role text default 'member' -- 'admin' | 'member'
);

-- RLS POLICIES (Security)
alter table profiles enable row level security;
alter table user_products enable row level security;
alter table benchmarks enable row level security;
alter table training_sessions enable row level security;
alter table certifications enable row level security;
alter table organizations enable row level security;
alter table cohorts enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

-- Policies for Products (Read own)
create policy "Users can view own products." on user_products for select using ( auth.uid() = user_id );

-- Policies for Benchmarks (Read/Insert own)
create policy "Users can view own benchmarks." on benchmarks for select using ( auth.uid() = user_id );
create policy "Users can insert own benchmarks." on benchmarks for insert with check ( auth.uid() = user_id );

-- Policies for Training Sessions (Read/Insert own)
create policy "Users can view own training sessions." on training_sessions for select using ( auth.uid() = user_id );
create policy "Users can insert own training sessions." on training_sessions for insert with check ( auth.uid() = user_id );

-- Functions
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
