import styles from './Backdrop.module.scss';

/** 히어로·연락 섹션 뒤에 깔리는 장식 배경(도트 그리드 + 오로라). 스크린리더에는 노출하지 않는다. */
export function Backdrop({ fade = true }: { fade?: boolean }) {
  return (
    <div aria-hidden className={styles.backdrop}>
      <span className={`${styles.blob} ${styles.gold}`} />
      <span className={`${styles.blob} ${styles.indigo}`} />
      {fade && <span className={styles.fade} />}
    </div>
  );
}
