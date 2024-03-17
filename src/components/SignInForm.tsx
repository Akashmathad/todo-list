'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  SignInFormTypes,
  signInFormSchema,
} from '@/types/validators/signInValidotors';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from './ui/use-toast';

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = ({}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<SignInFormTypes>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
    },
  });

  async function onSubmit(values: SignInFormTypes) {
    setLoading(true);
    const signInData = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast({
        title: 'Failed',
        description: 'Incorrect username or Password',
        variant: 'destructive',
      });
    } else {
      router.push('/');
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="border border-border p-12 rounded-lg shadow-lg bg-primary_light">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-4">
            <h3 className="text-center text-3xl font-bold">Sign In Page</h3>
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
          </div>
          <Button isLoading={loading} type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
        <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>

        <p className="text-center text-sm text-stone-600 dark:text-stone-400 mt-4">
          If you don&apos;t have an account, please&nbsp;
          <Link
            className="text-foreground hover:underline underline-offset-4"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignInForm;
