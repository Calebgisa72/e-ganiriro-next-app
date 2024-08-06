'use server';

import { validateRequest } from '@/src/auth';
import prisma from '@/src/lib/prisma';
import { createPostSchema } from '@/src/lib/validation';

export async function submmitPost(input: string) {
  const { user } = await validateRequest();
  if (!user) throw Error('Unauthorized action');
  const { content } = createPostSchema.parse({ content: input });

  await prisma.post.create({
    data: {
      content,
      userId: user.id
    }
  });
}
