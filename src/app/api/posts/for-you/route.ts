import { validateRequest } from '@/src/auth';
import prisma from '@/src/lib/prisma';
import { postDataInclude } from '@/src/lib/types';
import { use } from 'react';

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return Response.json({ error: 'Unauthorized action' }, { status: 401 });
    }
    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: 'desc' }
    });
    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
