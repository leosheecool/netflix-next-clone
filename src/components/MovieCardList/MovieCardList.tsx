import { Movie } from '@prisma/client';
import React from 'react';
import { MovieCard } from '@/components';
import styles from './MovieCardList.module.scss';

type Props = {
  movies?: Movie[];
};

const MovieCardList = ({ movies }: Props) => {
  return (
    <div className={styles.container}>
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieCardList;
