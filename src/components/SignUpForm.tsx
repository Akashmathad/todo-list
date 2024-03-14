'use client';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  SignUpFormTypes,
  signUpFormSchema,
} from '@/types/validators/signUpValidators';

interface SignInFormProps {}

const SignUpForm: FC<SignInFormProps> = ({}) => {
  const form = useForm<SignUpFormTypes>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(values: SignUpFormTypes) {
    console.log(values);
  }

  return (
    <div className="border border-border p-12 mt-10 rounded-lg shadow-lg bg-primary_light">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-4">
            <h3 className="text-center text-3xl font-bold">Sign Up Page</h3>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password..."
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-Enter your Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-Enter your Password."
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>

        <p className="text-center text-sm text-stone-600 dark:text-stone-400 mt-4">
          If you already have an account, please&nbsp;
          <Link
            className="text-foreground hover:underline underline-offset-4"
            href="/sign-in"
          >
            Sign In
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpForm;
