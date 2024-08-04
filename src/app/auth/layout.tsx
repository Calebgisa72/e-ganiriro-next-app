import { validateRequest } from '@/src/auth';
import { Providers } from '../../lib/provider';
import { redirect } from 'next/navigation';
import Navbar from '@/src/components/ui/Navbar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await validateRequest();
  if (session.user) redirect('/');
  return (
    <Providers>
      <div className="flex pt-[80px]">
        <Navbar session={session} />
        <div className="flex h-[calc(100vh-80px)] w-full">{children}</div>
      </div>
    </Providers>
  );
}
