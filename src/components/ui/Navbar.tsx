import React from 'react';
import Search from './Search';
import { sessionPros } from '@/src/auth';
import Profile from './Profile';

export interface NavbarProps {
  session?: sessionPros;
}

const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="fixed top-0 w-full min-h-[80px] backdrop-blur-[1px] bg-background/30 z-10">
      <div className="flex flex-wrap bg-background py-4 items-center justify-center gap-3 h-[90%] border-b-[2px] border-border px-4 md:px-12">
        <p className="text-lg sm:text-xl inline-block font-bold text-primary">E-Ganiriro</p>
        <div className="flex flex-1 mx-auto min-w-36 max-w-[450px]">
          <Search />
        </div>
        <div className="w-7 md:w-9 lg:w-10">{session?.user && <Profile session={session} />}</div>
      </div>
    </div>
  );
};

export default Navbar;
