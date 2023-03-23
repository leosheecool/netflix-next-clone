import { Movie } from '@prisma/client';
import React from 'react';

import styles from './MovieCard.module.scss';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  const videoref = React.useRef<HTMLVideoElement>(null);

  const handleVideoPlaying = async () => {
    if (!videoref.current) return;

    try {
      videoref.current.muted = false;
      await videoref.current.play();
    } catch (err) {
      videoref.current.muted = true;
      videoref.current.play();
    }
  };

  const handleVideoStop = () => {
    if (videoref.current) {
      videoref.current.pause();
      videoref.current.currentTime = 0;
    }
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleVideoPlaying}
      onMouseLeave={handleVideoStop}
    >
      <video
        className={styles.video}
        src={movie.videoUrl}
        poster={movie.thumbnailUrl}
        loop
        ref={videoref}
      />
      <img
        src={movie.thumbnailUrl}
        alt={movie.title}
        className={styles.thumbnail}
      />
    </div>
  );
};

export default MovieCard;
