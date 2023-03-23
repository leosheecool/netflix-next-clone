import { Movie } from '@prisma/client';
import React, { useEffect } from 'react';

import styles from './MovieCard.module.scss';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
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
        videoRef.current.muted = true;
        videoRef.current.play();
      }
    };
    if (isHovering) playVideo();
  }, [isHovering]);

  const handleVideoStop = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={handleVideoPlaying}
      onMouseLeave={handleVideoStop}
    >
      {isHovering && (
        <video
          className={styles.video}
          src={movie.videoUrl}
          poster={movie.thumbnailUrl}
          loop
          autoPlay
          ref={videoRef}
        />
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
