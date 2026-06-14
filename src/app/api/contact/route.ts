import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// POST /api/contact — save contact form submission.
// Uses the service-role client so the server-side write bypasses RLS
// (no public insert/select policies needed on the contacts table).
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        name,
        email,
        company: company || null,
        message,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error, null, 2));
      throw error;
    }

    return NextResponse.json(
      { success: true, contact: data },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errObj = error as Record<string, unknown>;
    console.error('Contact POST error:', JSON.stringify(errObj, null, 2));
    return NextResponse.json(
      { error: 'Failed to save contact', detail: errObj?.message || errObj?.code || String(error) },
      { status: 500 }
    );
  }
}
