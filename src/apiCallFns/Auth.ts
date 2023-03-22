import axios from 'axios';
import { signIn } from 'next-auth/react';

export const loginUser = (data: { email: string; password: string }) => {
  return signIn('credentials', {
    email: data.email,
    password: data.password,
    callbackUrl: '/profiles'
  });
};

export const registerUser = (data: {
  email: string;
  password: string;
  username: string;
}) => {
  return axios.post('/api/register', data);
};
