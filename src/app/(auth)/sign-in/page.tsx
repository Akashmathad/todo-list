import SignInForm from '@/components/SignInForm';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="container h-screen flex flex-col items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default page;
