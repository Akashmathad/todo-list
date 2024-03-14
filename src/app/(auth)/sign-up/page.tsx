import SignUpForm from '@/components/SignUpForm';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="container h-screen flex flex-col items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default page;
