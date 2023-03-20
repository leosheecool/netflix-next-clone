import React from 'react';
import styles from '@/styles/Auth.module.scss';
import { FormInput } from '@/components';

const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <img
          src="/images/logos/Netflix_2015_logo.svg"
          alt="netflix"
          className={styles.logo}
        />
        <div className={styles.formContainer}>
          <h2>Sign in</h2>
          <FormInput label="email" id="email" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
