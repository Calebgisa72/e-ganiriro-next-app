import React from 'react';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import avaterPlaceholder from '@/src/assets/avatar-placeholder.png';

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  classname?: string;
}

const UserAvatar = ({ avatarUrl, size, classname }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || avaterPlaceholder}
      alt="User avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        'aspect-square h-fit flex-none rounded-full bg-secondary object-cover',
        classname
      )}
    />
  );
};

export default UserAvatar;
