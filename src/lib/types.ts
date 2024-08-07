import { Prisma } from '@prisma/client';

export const userSelectData = {
  id:true,
  username: true,
  firstName: true,
  lastName: true,
  profilePic: true
} satisfies Prisma.UserSelect;

export const postDataInclude = {
  user: {
    select: userSelectData
  }
} satisfies Prisma.PostInclude;

export type PostDetails = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
