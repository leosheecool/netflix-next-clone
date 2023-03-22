import { getSession, signOut } from 'next-auth/react';
import { getCurrentUser } from '@/apiCallFns/User';

import utilsStyles from '@/styles/utils.module.scss';
import { NextPageContext } from 'next';
import { useQuery } from '@tanstack/react-query';

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
  const { data: user, isLoading } = useQuery(['currentUser'], {
    queryFn: getCurrentUser
  });

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world</h1>
      <p>Logged in as {user?.data.name}</p>
      <button className={utilsStyles.primaryBtn} onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}
