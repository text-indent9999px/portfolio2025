import styles from './Backdrop.module.scss';

/**
 * 히어로·연락 섹션 뒤에 까는 배경 래퍼. 참고 삼은 레퍼런스가 배경이 완전히
 * 평평해서(도트 패턴·그라데이션 얼룩 없음) 지금은 장식을 넣지 않는다.
 * 다음 섹션과의 경계만 자연스럽게 녹이는 `fade`만 남겨 뒀다. 스크린리더에는 노출하지 않는다.
 */
export function Backdrop({ fade = true }: { fade?: boolean }) {
  return (
    <div aria-hidden className={styles.backdrop}>
      {fade && <span className={styles.fade} />}
    </div>
  );
}
