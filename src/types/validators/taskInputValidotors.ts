'use client';

import { z } from 'zod';

export const taskInputSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  endTime: z.string().min(1, { message: 'End time is required' }),
  priority: z.string(),
});

export type TaskInputTypes = z.infer<typeof taskInputSchema>;
