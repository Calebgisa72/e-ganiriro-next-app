import React from 'react';
import { Metadata } from 'next';
import LoginForm from './form';
import loginImage from '../../../assets/login-image.jpg';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login'
};

const Login = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="flex border-[1px] border-slate-500 h-[450px] w-[300px] sm:w-[650px] rounded-xl overflow-hidden items-center">
        <div className="flex flex-col gap-3 items-center w-full sm:w-[55%] p-5">
          <div>
            <p className="uppercase text-teal-900 font-bold">Login to E-Ganiriro</p>
          </div>
          <LoginForm />
          <Link href={'/auth/signup'}>
            <p className="text-sm hover:underline text-teal-900 ">
              Don&apos;t have an account? Register
            </p>
          </Link>
        </div>
        <Image
          className="hidden sm:block w-[45%] object-cover object-left h-full"
          src={loginImage}
          alt="Signup"
        />
      </div>
    </div>
  );
};

export default Login;
