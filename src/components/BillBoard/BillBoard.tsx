import useBillBoard from '@/hooks/useBillBoard';
import React from 'react';
import cn from 'classnames';

import styles from './BillBoard.module.scss';
import utilsStyles from '@/styles/utils.module.scss';
import { FaInfoCircle } from 'react-icons/fa';

const BillBoard = () => {
  const { data } = useBillBoard();
  return (
    <div className={styles.container}>
      <video
        poster={data?.thumbnailUrl}
        autoPlay
        muted
        loop
        id="myVideo"
        src={data?.videoUrl}
        className={styles.video}
      />
      <div className={styles.videoInformations}>
        <h2>{data?.title}</h2>
        <p>{data?.description}</p>
        <button className={cn(utilsStyles.secondaryBtn, styles.infoBtn)}>
          <FaInfoCircle />
          <span>More info</span>
        </button>
      </div>
    </div>
  );
};

export default BillBoard;
