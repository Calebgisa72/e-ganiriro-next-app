'use server';
import { lucia, validateRequest } from '@/src/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const { session } = await validateRequest();

  if (!session) {
    throw new Error('unauthorized action');
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect('/auth/login');
}
