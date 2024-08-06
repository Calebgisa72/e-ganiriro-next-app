'use client';

import React, { useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginProps, loginSchema } from '@/src/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { login } from './actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form';

const LoginForm = () => {
  const { ...form } = useForm<loginProps>({
    defaultValues: {
      username: '',
      password: ''
    },
    resolver: zodResolver(loginSchema)
  });
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const onSubmit: SubmitHandler<loginProps> = async (formData) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await login(formData);
      if (error) setError(error);
    });
  };
  const password = form.watch('password');
  return (
    <Form {...form}>
      {error && <span className="text-red-600 text-lg mt-[-12px]">{error}</span>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username:</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? 'name' : 'password'}
                    placeholder="Password"
                    className="pr-[40px]"
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      title={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-2 top-[20px] -translate-y-1/2 transform text-muted-foreground">
                      {showPassword ? (
                        <EyeOff className="w-[22px] " />
                      ) : (
                        <Eye className="w-[22px]" />
                      )}
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className='size-5 animate-spin'/> : 'Log in'}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
