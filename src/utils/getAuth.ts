import { getSession } from 'next-auth/react';
import { auth } from '@/domain/user/utils/auth';

export async function getAuth() {
  if (typeof window === 'undefined') {
    return await auth();
  }

  return await getSession();
}
