'use server'

import { lucia } from '@/src/auth';
import prisma from '@/src/lib/prisma';
import { loginProps, loginSchema } from '@/src/lib/validation';
import bcrypt from 'bcrypt';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(credentials: loginProps): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(credentials);
    const user = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } }
    });

    if (!user) return { error: 'Incorrect username or password' };

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (validPassword) {
      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } else {
      return { error: 'Incorrect username or password' };
    }
    redirect('/');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: 'Internal server error'
    };
  }
}
