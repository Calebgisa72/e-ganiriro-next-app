import { Metadata } from 'next';
import SignupForm from './form';
import signupImage from '../../../assets/signup-image.jpg';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign up'
};

export default function Signup() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="flex border-[1px] border-slate-500 h-[450px] w-[300px] sm:w-[650px] rounded-xl overflow-hidden">
        <div className="flex flex-col gap-3 items-center w-full sm:w-[55%] p-5">
          <div>
            <p className="uppercase text-teal-900 font-bold">Sign up to E-Ganiriro</p>
            <p className="text-[12px] text-center text-primary">
              <span className="italic">Find</span> and <span className="italic">Chill</span> with
              friends
            </p>
          </div>
          <SignupForm />
          <Link href={'/auth/login'}>
            <p className="text-sm hover:underline text-teal-900">Already have an account? Log in</p>
          </Link>
        </div>
        <Image
          className="hidden sm:block w-[45%] object-cover object-left"
          src={signupImage}
          alt="Signup"
        />
      </div>
    </div>
  );
}
