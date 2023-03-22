import React, { useState } from 'react';
import styles from '@/styles/Auth.module.scss';
import utilsStyles from '@/styles/utils.module.scss';
import { FormInput } from '@/components';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { loginUser, registerUser } from '@/apiCallFns/Auth';
import { useRouter } from 'next/router';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

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
  const router = useRouter();
  const { register, handleSubmit } = useForm<Data>();
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string>();
  const registerMutation = useMutation({ mutationFn: registerUser });
  const loginMutation = useMutation({
    mutationFn: async (data: Omit<Data, 'username'>) => {
      const test = await loginUser(data);
      if (!test) return;
      test.status === 200 && router.push(test.url || '/');
      setError(test.error);
      throw new Error(test.error);
    }
  });

  const handleSubmitForm = (data: Data) => {
    if (formType === 'signup') {
      registerMutation.mutate(data as Required<Data>);
      setFormType('login');
      return;
    }
    loginMutation.mutate(data);
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
                {...register('username', { required: formType === 'signup' })}
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
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={utilsStyles.primaryBtn}>
              {pageText[formType].buttonText}
            </button>
          </form>
          <div className={styles.oAuthIconsContainer}>
            <FcGoogle
              className={styles.oAuthIcon}
              onClick={() => signIn('google', { callbackUrl: '/' })}
            />
            <FaGithub
              className={styles.oAuthIcon}
              onClick={() => signIn('github', { callbackUrl: '/' })}
            />
          </div>
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
