import type { HTMLAttributes } from 'react';

export interface OverlayProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  open: boolean;
  blur?: boolean; // 배경 블러 여부
  lockScroll?: boolean; // 오픈 시 body 스크롤 잠금
  unstyled?: boolean; // 커스텀 클래스 적용 여부
  zIndex?: number; // 오버레이 z-index
  closeOnBackdropClick?: boolean; // 오버레이 배경 클릭 시 닫기 여부 (기본값: true)
  /** `onClose`가 있을 때 Escape로 닫기 (기본 true). 로딩 등에는 false 권장 */
  closeOnEscape?: boolean;
  onClose?: () => void; // 닫기 콜백 (closeOnBackdropClick이 true일 때 사용)
  trapFocus?: boolean; // 포커스 트랩 활성화 여부 (기본값: true)
  /** 기본 `dialog`. 전면 배경만 등 비대화면은 `presentation` 등 */
  role?: HTMLAttributes<HTMLDivElement>['role'];
  ariaLabel?: string; // 접근성: 모달 제목 (aria-label)
  ariaLabelledBy?: string; // 접근성: 모달 제목 요소 ID (aria-labelledby)
  id?: string; // 접근성: 모달 ID (aria-controls 연결용)
}
