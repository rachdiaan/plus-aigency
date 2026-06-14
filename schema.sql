-- Supabase Schema for Studio Features
-- Run this in your Supabase SQL Editor

-- 1. Create table for Generated Assets (from ViewGenerator)
CREATE TABLE IF NOT EXISTS public.generated_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    style TEXT,
    ratio TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.generated_assets ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see and insert only their own assets
CREATE POLICY "Users can view own assets" 
    ON public.generated_assets FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assets" 
    ON public.generated_assets FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- 2. Create table for Campaigns (from ViewPlanner)
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    industry TEXT,
    market TEXT,
    idea TEXT,
    calendar_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see and insert only their own campaigns
CREATE POLICY "Users can view own campaigns" 
    ON public.campaigns FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own campaigns" 
    ON public.campaigns FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
