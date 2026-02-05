import { NextResponse } from 'next/server';
import { signOut } from '@/domain/user/utils/auth';

export async function GET(request: Request) {
  await signOut({ redirect: false });

  return NextResponse.redirect(new URL('/?logout=success', request.url));
}
