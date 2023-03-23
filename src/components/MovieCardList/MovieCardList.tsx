import { Movie } from '@prisma/client';
import React from 'react';
import { MovieCard } from '@/components';
import styles from './MovieCardList.module.scss';
import useCurrentUser from '@/hooks/useCurrentUser';

type Props = {
  movies?: Movie[];
};

const MovieCardList = ({ movies }: Props) => {
  const { data: user } = useCurrentUser();
  return (
    <div className={styles.container}>
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInList={user?.favoriteIds.includes(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieCardList;
