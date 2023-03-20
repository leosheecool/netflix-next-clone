import React, { useCallback, useState } from 'react';
import styles from '@/styles/Auth.module.scss';
import { FormInput } from '@/components';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type Data = {
  email: string;
  password: string;
  username?: string;
};

const pageText = {
  login: {
    title: 'Sign in',
    buttonText: 'Login',
    helperText: 'New to Netflix? ',
    helperLinkText: 'Sign up now'
  },
  signup: {
    title: 'Sign up',
    buttonText: 'Register',
    helperText: 'Already have an account? ',
    helperLinkText: 'Sign in now'
  }
};

const Auth = () => {
  const { register, handleSubmit } = useForm<Data>();
  const [formType, setFormType] = useState<'login' | 'signup'>('login');

  const registerUser = useCallback(async (data: Data) => {
    try {
      await axios.post('/api/register', data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmitForm = (data: Data) => {
    if (formType === 'signup') {
      registerUser(data);
      return;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <img
          src="/images/logos/Netflix_2015_logo.svg"
          alt="netflix"
          className={styles.logo}
        />
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h2>{pageText[formType].title}</h2>
            {formType === 'signup' && (
              <FormInput
                label="Username"
                id="username"
                {...register('username')}
              />
            )}
            <FormInput
              label="Email"
              id="email"
              type="email"
              {...register('email')}
            />
            <FormInput
              label="Password"
              id="password"
              type="password"
              {...register('password')}
            />
            <button type="submit" className={styles.signInBtn}>
              {pageText[formType].buttonText}
            </button>
          </form>
          <p className={styles.helperText}>
            {pageText[formType].helperText}
            <span
              onClick={() =>
                setFormType(formType === 'login' ? 'signup' : 'login')
              }
              className={styles.helperLink}
            >
              {pageText[formType].helperLinkText}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
