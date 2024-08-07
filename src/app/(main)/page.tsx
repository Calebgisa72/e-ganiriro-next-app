import PostEditor from '../post/PostEditor';
import prisma from '@/src/lib/prisma';
import SinglePost from '../post/SinglePost';
import { postDataInclude } from '@/src/lib/types';
import TrendSideBar from '@/src/components/ui/TrendSideBar';

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: 'desc' }
  });
  return (
    <div className="px-5 w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </div>
      <TrendSideBar />
    </div>
  );
}
