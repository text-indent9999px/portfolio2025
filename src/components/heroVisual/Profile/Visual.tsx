'use client';

import { useEffect, useState } from 'react';
import styles from './Visual.module.scss';

const cols = 8;
const rows = 8;
const cells = cols * rows;

export default function ProfileVisual() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let frameA = 0;
    let frameB = 0;

    frameA = requestAnimationFrame(() => {
      frameB = requestAnimationFrame(() => {
        setIsReady(true);
      });
    });

    return () => {
      cancelAnimationFrame(frameA);
      cancelAnimationFrame(frameB);
    };
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div className={styles['dot-container']}>
      <div className={styles['container']}>
        {Array.from({ length: cells }).map((_, i) => (
          <div className={styles['square']} key={i}>
            <div className={styles['dot']} />
            <div className={styles['dot']} />
          </div>
        ))}
      </div>
    </div>
  );
}
