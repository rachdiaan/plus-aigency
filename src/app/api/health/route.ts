import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/health — check Supabase connection
export async function GET() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      status: 'error',
      message: 'Supabase not configured (missing URL or key)',
    }, { status: 503 });
  }

  try {
    const { error } = await supabase.rpc('version');

    if (error) {
      // Fallback: try a simple table query
      const { error: fallbackError } = await supabase
        .from('subscribers')
        .select('id')
        .limit(1);

      if (fallbackError) {
        return NextResponse.json({
          status: 'error',
          message: 'Supabase connected but query failed',
          error: fallbackError.message,
        }, { status: 500 });
      }
    }

    return NextResponse.json({ status: 'ok', message: 'Supabase connected successfully!' });
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: 'Connection failed',
      error: String(err),
    }, { status: 500 });
  }
}
