'use server';

import { lucia } from '@/src/auth';
import prisma from '@/src/lib/prisma';
import { signupProps, signupSchema } from '@/src/lib/validation';
import bcrypt from 'bcrypt';
import { generateIdFromEntropySize } from 'lucia';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signup(credentials: signupProps): Promise<{ error: string }> {
  try {
    const { username, email, firstName, lastName, password } = signupSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } }
    });
    if (existingUser) {
      return {
        error: 'Username already taken.'
      };
    }
    const existingEmail = await prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } }
    });
    if (existingEmail) {
      return {
        error: 'Email is already registered.'
      };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = generateIdFromEntropySize(10);
    await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
        firstName,
        lastName,
        passwordHash
      }
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    redirect('/');
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: 'Internal server error'
    };
  }
}
