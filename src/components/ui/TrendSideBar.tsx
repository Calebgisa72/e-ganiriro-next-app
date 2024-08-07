import { validateRequest } from '@/src/auth';
import prisma from '@/src/lib/prisma';
import { userSelectData } from '@/src/lib/types';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';
import UserAvatar from './UserAvatar';
import { Button } from './button';

const TrendSideBar = () => {
  return (
    <div className="sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5">
      <Suspense fallback={<Loader2 className="size-5 animate-spin" />}>
        <WhoToFollow />
      </Suspense>
    </div>
  );

  async function WhoToFollow() {
    const { user } = await validateRequest();
    if (!user) return;
    const usersToFollow = await prisma.user.findMany({
      where: {
        NOT: {
          id: user.id
        }
      },
      select: userSelectData,
      take: 6
    });
    return (
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-3 bg-card rounded-2xl p-5 shadow-sm">
          <p className="font-bold">Who to follow</p>
          {usersToFollow.map((user) => {
            return (
              <div key={user.id} className="flex items-center justify-between gap-3">
                <Link className="flex items-center gap-3" href={`/users/${user.username}`}>
                  <UserAvatar avatarUrl={user.profilePic} classname="flex-none" />
                  <div>
                    <p className="line-clamp-1 break-all font-semibold hover:underline">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="line-clamp-1 break-all text-muted-foreground">@{user.username}</p>
                  </div>
                </Link>
                <Button>Follow</Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default TrendSideBar;
