import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('access_token', '', { maxAge: 0 });
  res.cookies.set('refresh_token', '', { maxAge: 0 });
  return res;
}
