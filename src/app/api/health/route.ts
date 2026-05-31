import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/health — check Supabase connection
export async function GET() {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return NextResponse.json({
      status: 'error',
      message: 'Supabase not configured (missing URL or key)',
    }, { status: 503 });
  }

  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from('kol_database')
      .select('id, name')
      .limit(1);

    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase connected but query failed',
        error: error.message,
        code: error.code,
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase connected successfully!',
    });
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: 'Connection failed',
      error: String(err),
    }, { status: 500 });
  }
}
