import styles from './Visual.module.scss';

const cols = 8;
const rows = 8;
const cells = cols * rows;

export default function ProfileVisual() {
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
