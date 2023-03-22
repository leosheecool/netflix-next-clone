import { getSession, signOut } from 'next-auth/react';
import { getCurrentUser } from '@/apiCallFns/User';

import utilsStyles from '@/styles/utils.module.scss';
import { NextPageContext } from 'next';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components';

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
      <h1 className="text-3xl font-bold underline">Hello world</h1>
      <p>Logged in as {user?.data.name}</p>
      <button className={utilsStyles.primaryBtn} onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}
