import { NextResponse } from 'next/server';
import { createSupabaseServerWithAuth } from '@/lib/supabase/server';

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  const supabase = createSupabaseServerWithAuth(new Headers(req.headers));
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url')
    .eq('id', params.id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(req: Request, { params }: Params) {
  const supabase = createSupabaseServerWithAuth(new Headers(req.headers));
  const payload = await req.json().catch(() => ({})) as { username?: string; avatar_url?: string };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.id !== params.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updates: { username?: string | null; avatar_url?: string | null } = {};
  if (Object.prototype.hasOwnProperty.call(payload, 'username')) {
    updates.username = payload.username ?? null;
  }
  if (Object.prototype.hasOwnProperty.call(payload, 'avatar_url')) {
    updates.avatar_url = payload.avatar_url ?? null;
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', params.id)
    .select('id, username, avatar_url')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_: Request, { params }: Params) {
  const supabase = createSupabaseServerWithAuth();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.id !== params.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { error } = await supabase.from('profiles').delete().eq('id', params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}


