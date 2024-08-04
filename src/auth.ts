import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from './lib/prisma';
import { Lucia, Session, User } from 'lucia';
import { cache } from 'react';
import { cookies } from 'next/headers';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production'
    }
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      id: databaseUserAttributes.id,
      username: databaseUserAttributes.username,
      googleId: databaseUserAttributes.googleId,
      firstName: databaseUserAttributes.firstName,
      lastName: databaseUserAttributes.lastName,
      email: databaseUserAttributes.email,
      profilePic: databaseUserAttributes.profilePic
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  username: string;
  googleId?: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic?: string;
}

export interface sessionPros {
  user: User | null;
  session?: Session | null;
}

export const validateRequest = cache(async (): Promise<sessionPros> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}
  return result;
});
