import { z } from 'zod';

const requiredString = z.string().trim().min(1, 'Required');

export const signupSchema = z.object({
  username: requiredString
    .min(5, 'Username must atleast be 5 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Only leters, numbers, - and _ allowed'),
  email: z.string().email('Invalid email address'),
  firstName: requiredString,
  lastName: requiredString,
  password: requiredString.min(8, 'Must be 8 charactes or more')
});

export type signupProps = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString
});

export type loginProps = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString
});

export type postProps = z.infer<typeof createPostSchema>;
