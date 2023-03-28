import { getMovieById } from '@/apiCallFns/Movie';
import { useQuery } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import styles from '@/styles/watch.module.scss';
import {
  AiFillInfoCircle,
  AiOutlineArrowLeft,
  AiOutlineClose
} from 'react-icons/ai';
import { MovieCardList } from '@/components';

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

const Watch = () => {
  const [infoIsShown, setInfoIsShown] = useState(false);

  const router = useRouter();
  const { movieId } = router.query;

  const {
    data: movieData,
    error,
    isLoading
  } = useQuery(['movie', movieId], {
    queryFn: async () => getMovieById(movieId as string)
  });

  const movie = movieData?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div className={styles.container}>
      <video
        poster={movie?.thumbnailUrl}
        src={movie?.videoUrl}
        autoPlay
        muted
        controls
        className={styles.video}
      />
      {/* <button
        className={styles.showInfoBtn}
        onClick={() => setInfoIsShown(true)}
      >
        <span>show info</span> */}
      <AiFillInfoCircle
        className={styles.infoIcon}
        onClick={() => setInfoIsShown(true)}
      />
      {/* </button> */}
      {infoIsShown && (
        <div className={styles.infoContainer}>
          <div className={styles.navigationIconContainer}>
            <AiOutlineArrowLeft
              className={styles.icon}
              onClick={() => router.push('/')}
            />
            <AiOutlineClose
              className={styles.icon}
              onClick={() => setInfoIsShown(false)}
            />
          </div>
          <h1 className={styles.movieTitle}>{movie?.title}</h1>
          <p className={styles.infoSection}>
            <strong>{movie?.genre.join(', ')}</strong> - {movie?.duration}
          </p>
          <div className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <p>{movie?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watch;
