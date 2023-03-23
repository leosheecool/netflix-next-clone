import axios from 'axios';

export const getRandomMovie = () => {
  return axios.get('/api/randomMovie');
};
