import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET /api/chat?session_id=xxx — retrieve chat history
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ messages: data });
  } catch (error) {
    console.error('Chat GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST /api/chat — save a chat message
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { session_id, role, content } = body;

    if (!session_id || !role || !content) {
      return NextResponse.json(
        { error: 'session_id, role, and content are required' },
        { status: 400 }
      );
    }

    if (!['user', 'assistant'].includes(role)) {
      return NextResponse.json(
        { error: 'role must be "user" or "assistant"' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({ session_id, role, content })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ message: data }, { status: 201 });
  } catch (error) {
    console.error('Chat POST error:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
