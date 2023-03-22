import { User } from '@prisma/client';
import axios from 'axios';

export const getCurrentUser = () => {
  return axios.get<User>('/api/current');
};
