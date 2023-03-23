import axios from 'axios';

export const getRandomMovie = () => {
  return axios.get('/api/randomMovie');
};

export const getMovies = () => {
  return axios.get('/api/movies');
};

export const getLatestMovies = () => {
  return axios.get('/api/movies/latest');
};
