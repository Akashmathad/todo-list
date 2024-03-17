import { FC } from 'react';
import { ModeToggle } from '@/components/DarkMode';
import { Button, buttonVariants } from './ui/button';
import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';
import Signout from './Signout';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 py-4 z-10 border-b border-primary w-full bg-primary_light">
      <div className="container flex items-center justify-between">
        <p>logo</p>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {session?.user ? (
            <Signout />
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
