'use client';
import { FC } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface SignoutProps {}

const Signout: FC<SignoutProps> = ({}) => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await signOut();
        router.refresh();
      }}
      variant="secondary"
    >
      Signout
    </Button>
  );
};

export default Signout;
