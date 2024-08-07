'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSession } from '@/src/app/redux/reducers/authReducer';
import { NavbarProps } from './Navbar';
import userIcon from '@/src/assets/avatar-placeholder.png';
import { Check, Loader2, LogOutIcon, Monitor, Moon, Sun } from 'lucide-react';
import UserAvatar from './UserAvatar';
import {
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuTrigger
} from './dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from '@/src/app/auth/actions';
import { useTheme } from 'next-themes';

const Profile = ({ session }: NavbarProps) => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    dispatch(setSession({}));
  };

  useEffect(() => {
    if (session?.user) {
      dispatch(setSession(session.user));
    }
  }, [session, dispatch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-shrink-0 rounded-full items-center">
          {loggingOut? <Loader2 className='size-5 animate-spin'/>: <UserAvatar avatarUrl={session?.user?.profilePic} size={40} />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-semibold">
          Logged in as @{session?.user?.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`user/${session?.user?.username}`}>
          <DropdownMenuItem>
            <Image src={userIcon} alt="icon" className="mr-2 size-5" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-5" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => {
                  setTheme('system');
                }}
                className="cursor-pointer">
                <Monitor className="mr-2 size-4" />
                System default
                {theme === 'system' && <Check className="size-4 ms-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme('light');
                }}
                className="cursor-pointer">
                <Sun className="mr-2 size-4" />
                Light
                {theme === 'light' && <Check className="size-4 ms-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme('dark');
                }}
                className="cursor-pointer">
                <Moon className="mr-2 size-4" />
                Dark
                {theme === 'dark' && <Check className="size-4 ms-2" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOutIcon className="mr-2 size-5" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
