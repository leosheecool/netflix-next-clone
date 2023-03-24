import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import { useQuery } from '@tanstack/react-query';
import { BillBoard, MovieCardList, Navbar } from '@/components';
import { getFavoriteMovies, getLatestMovies } from '@/apiCallFns/Movie';

import styles from '@/styles/index.module.scss';
import { Movie } from '@prisma/client';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
};

export default function Home() {
  const { data: latestMovies } = useQuery(['latestMovies'], {
    queryFn: getLatestMovies
  });
  const { data: favoriteMovies } = useQuery(['favoriteMovies'], {
    queryFn: getFavoriteMovies
  });

  return (
    <>
      <Navbar />
      <BillBoard />
      <div className={styles.listContainer}>
        <h2 className={styles.listTitle}>Latest Movies</h2>
        <MovieCardList movies={latestMovies?.data} />
        {favoriteMovies?.data && favoriteMovies?.data.length > 0 && (
          <>
            <h2 className={styles.listTitle}>Favorite Movies</h2>
            <MovieCardList movies={favoriteMovies?.data} />
          </>
        )}
      </div>
    </>
  );
}
