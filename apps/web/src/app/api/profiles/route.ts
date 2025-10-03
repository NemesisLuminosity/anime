import { NextResponse } from 'next/server';
import { createSupabaseServerWithAuth } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const supabase = createSupabaseServerWithAuth(new Headers(req.headers));
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url')
    .order('username', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createSupabaseServerWithAuth(new Headers(req.headers));
  const body = await req.json().catch(() => null) as { id: string; username?: string; avatar_url?: string } | null;

  if (!body?.id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.id !== body.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: body.id, username: body.username ?? null, avatar_url: body.avatar_url ?? null })
    .select('id, username, avatar_url')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}


