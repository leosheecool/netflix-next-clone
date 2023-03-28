import { Movie } from '@prisma/client';
import axios from 'axios';

export const getRandomMovie = () => {
  return axios.get('/api/randomMovie');
};

export const getMovies = () => {
  return axios.get('/api/movies');
};

export const getMovieById = (id: string) => {
  return axios.get<Movie>(`/api/movies/${id}`);
};

export const getLatestMovies = () => {
  return axios.get('/api/movies?orderBy=desc&take=10');
};

export const getFavoriteMovies = () => {
  return axios.get<Movie[]>('/api/movies?favorite=true');
};

export const updateFavoriteSatus = (data: {
  movieId: string;
  favorite: boolean;
}) => {
  return axios.patch('/api/movies/favorite', data);
};
