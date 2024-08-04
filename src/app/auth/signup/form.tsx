'use client';

import React, { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signupProps, signupSchema } from '@/src/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { signup } from './actions';

const SignupForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<signupProps>({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      firstName: '',
      lastName: ''
    },
    resolver: zodResolver(signupSchema)
  });

  const onSubmit: SubmitHandler<signupProps> = async (data) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signup(data);
      if (error) setError(error);
    });
  };

  const password = watch('password');
  return (
    <div className="flex items-center h-[100%] w-[100%] flex-col gap-2">
      {error && <span className="text-red-500 text-sm mt-[-12px]">{error}</span>}
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('firstName')} type="text" placeholder="First Name" />
        {errors.firstName && (
          <span className="text-red-500 text-sm mt-[-12px]">{errors.firstName.message}</span>
        )}

        <Input {...register('lastName')} type="text" placeholder="Last Name" />
        {errors.lastName && (
          <span className="text-red-500 text-sm mt-[-12px]">{errors.lastName.message}</span>
        )}

        <Input {...register('username')} type="text" placeholder="Username" />
        {errors.username && (
          <span className="text-red-500 text-sm mt-[-12px]">{errors.username.message}</span>
        )}

        <Input {...register('email')} type="email" placeholder="Email" />
        {errors.email && (
          <span className="text-red-500 text-sm mt-[-12px]">{errors.email.message}</span>
        )}

        <div className="relative">
          <Input
            {...register('password')}
            type={showPassword ? 'name' : 'password'}
            placeholder="Password"
            className="pr-[40px]"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-[-12px]">{errors.password.message}</span>
          )}
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-[20px] -translate-y-1/2 transform text-muted-foreground">
              {showPassword ? <EyeOff className="w-[22px] " /> : <Eye className="w-[22px]" />}
            </button>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="size-5 animate-spin" /> : 'Register Account'}
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
