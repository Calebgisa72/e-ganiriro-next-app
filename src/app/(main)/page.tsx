import prisma from '@/src/lib/prisma';
import TrendSideBar from '@/src/components/ui/TrendSideBar';
import ForYouFeed from './ForYouFeed';
import PostEditor from '../post/PostEditor';

export default async function Home() {
  return (
    <div className="px-5 w-full min-w-0 flex gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendSideBar />
    </div>
  );
}
