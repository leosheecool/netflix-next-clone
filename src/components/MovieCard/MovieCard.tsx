import { updateFavoriteSatus } from '@/apiCallFns/Movie';
import { Movie } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  AiFillInfoCircle,
  AiFillMinusCircle,
  AiFillPlayCircle,
  AiFillPlusCircle
} from 'react-icons/ai';

import styles from './MovieCard.module.scss';

type Props = {
  movie: Movie;
  isInList?: boolean;
};

const testPromise = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {}, 2000);
    resolve('test');
  });
};

const MovieCard = ({ movie, isInList }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateFavoriteSatus, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['currentUser']);
      await queryClient.invalidateQueries(['favoriteMovies']);
    }
  });

  const [isHovering, setIsHovering] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleVideoPlaying = async () => {
    setIsHovering(true);
  };

  useEffect(() => {
    const playVideo = async () => {
      if (!videoRef.current) return;

      try {
        videoRef.current.muted = false;
        await videoRef.current.play();
      } catch (err) {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
        } catch (error) {}
      }
    };
    if (isHovering) playVideo();
  }, [isHovering]);

  const handleVideoStop = () => {
    setIsHovering(false);
  };

  const handleWatchVideo = () => {
    router.push(`/watch?movieId=${movie.id}`);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleVideoPlaying}
      onMouseLeave={handleVideoStop}
    >
      {isHovering && (
        <>
          <video
            className={styles.video}
            src={movie.videoUrl}
            poster={movie.thumbnailUrl}
            loop
            autoPlay
            ref={videoRef}
            onClick={handleWatchVideo}
          />
          <div className={styles.infoContainer}>
            <div className={styles.infoBtnContainer}>
              <div className={styles.infoBtnContainer}>
                <AiFillPlayCircle
                  className={styles.actionBtn}
                  onClick={handleWatchVideo}
                />
                {isInList ? (
                  <AiFillMinusCircle
                    className={styles.actionBtn}
                    onClick={() =>
                      mutate({ movieId: movie.id, favorite: false })
                    }
                  />
                ) : (
                  <AiFillPlusCircle
                    className={styles.actionBtn}
                    onClick={() =>
                      mutate({ movieId: movie.id, favorite: true })
                    }
                  />
                )}
              </div>
              <AiFillInfoCircle className={styles.actionBtn} />
            </div>
            <h2>{movie.title}</h2>
          </div>
        </>
      )}
      <img
        src={movie.thumbnailUrl}
        alt={movie.title}
        className={styles.thumbnail}
      />
    </div>
  );
};

export default MovieCard;
