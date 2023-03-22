import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/apiCallFns/User';
import { useRouter } from 'next/router';

import styles from '@/styles/Profiles.module.scss';

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
    props: {}
  };
};

const Profiles = () => {
  const router = useRouter();

  const { data: user } = useQuery(['currentUser'], {
    queryFn: getCurrentUser
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Who is watching ?</h1>
      <div>
        <img
          src="/images/default-blue.png"
          alt="profile"
          className={styles.profilePicture}
          onClick={() => router.push('/')}
        />
        <p className={styles.profileName}>{user?.data.name}</p>
      </div>
    </div>
  );
};

export default Profiles;
