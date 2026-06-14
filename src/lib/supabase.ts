import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 * Used by API route handlers to write leads/subscribers and bump view
 * counts. Never import this into client components.
 *
 * Returns `null` when env vars are absent so the app builds and runs
 * (the DB-backed features degrade gracefully) before Supabase is set up.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) return null;
    return createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}
export const isSupabaseConfigured = () =>
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const isClientConfigured = supabaseUrl.startsWith('https://') && supabaseAnonKey.length > 0;

// Client-side Supabase client (for use in React components)
export const supabase: SupabaseClient | null = isClientConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side Supabase client (for use in API routes / server components)
export const createServerSupabaseClient = (): SupabaseClient | null => {
  if (!isClientConfigured) return null;

  return createClient(supabaseUrl, supabaseAnonKey);
};
