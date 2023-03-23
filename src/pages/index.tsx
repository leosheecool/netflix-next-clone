import { getSession, signOut } from 'next-auth/react';
import { getCurrentUser } from '@/apiCallFns/User';

import utilsStyles from '@/styles/utils.module.scss';
import { NextPageContext } from 'next';
import { useQuery } from '@tanstack/react-query';
import { BillBoard, Navbar } from '@/components';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
};

export default function Home() {
  const { data: user } = useQuery(['currentUser'], {
    queryFn: getCurrentUser
  });

  return (
    <>
      <Navbar />
      <BillBoard />
    </>
  );
}
