'use client';

import { z } from 'zod';

export const signInFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: 'username is required',
    })
    .max(20, {
      message: 'Username should not exceed 20 characters',
    }),
  password: z.string().min(1, { message: 'Password is required' }).min(8, {
    message: 'Min length is 8 characters',
  }),
});

export type SignInFormTypes = z.infer<typeof signInFormSchema>;
