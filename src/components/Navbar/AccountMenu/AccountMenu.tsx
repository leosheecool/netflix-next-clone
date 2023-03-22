import Separator from '@/components/Separator/Separator';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './AccountMenu.module.scss';

type Props = {
  user: {
    profilePicture: string;
    name: string;
  };
};

const AccountMenu = ({ user }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.menuItem} onClick={() => router.push('/profiles')}>
        <img
          src={user.profilePicture}
          alt="profile"
          className={styles.userIcon}
        />
        <p>{user.name}</p>
      </div>
      <Separator />
      <p className={styles.menuItem} onClick={() => signOut()}>
        Logout
      </p>
    </div>
  );
};

export default AccountMenu;
