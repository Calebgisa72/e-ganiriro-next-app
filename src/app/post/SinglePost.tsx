import React from 'react';
import { PostDetails } from '@/src/lib/types';
import Link from 'next/link';
import UserAvatar from '@/src/components/ui/UserAvatar';
import { formatRelativeDate } from '@/src/lib/utils';

interface PostProps {
  post: PostDetails;
}

const SinglePost = ({ post }: PostProps) => {
  return (
    <div className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Link href={`/users/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.profilePic} />
        </Link>
        <div>
          <Link className="block hover:underline font-medium" href={`/users/${post.user.username}`}>
            {post.user.username}
          </Link>
          <Link
            className="block text-sm text-muted-foreground hover:underline"
            href={`/links/${post.id}`}>
            {formatRelativeDate(post.createdAt)}
          </Link>
        </div>
      </div>
      <div className="break-words whitespace-pre-line">{post.content}</div>
    </div>
  );
};

export default SinglePost;
