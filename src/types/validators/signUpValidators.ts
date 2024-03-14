'use client';

import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(1, {
        message: 'username is required',
      })
      .max(20, {
        message: 'Username should not exceed 20 characters',
      }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
    password: z.string().min(1, { message: 'Password is required' }).min(8, {
      message: 'Min length is 8 characters',
    }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, {
        message: 'Min length is 8 characters',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password doesn't match",
  });

export type SignUpFormTypes = z.infer<typeof signUpFormSchema>;
