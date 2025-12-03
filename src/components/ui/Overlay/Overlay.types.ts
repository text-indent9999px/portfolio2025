export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  blur?: boolean; // 배경 블러 여부
  lockScroll?: boolean; // 오픈 시 body 스크롤 잠금
  unstyled?: boolean; // 커스텀 클래스 적용 여부
  zIndex?: number; // 오버레이 z-index
  closeOnBackdropClick?: boolean; // 오버레이 배경 클릭 시 닫기 여부 (기본값: true)
  onClose?: () => void; // 닫기 콜백 (closeOnBackdropClick이 true일 때 사용)
  trapFocus?: boolean; // 포커스 트랩 활성화 여부 (기본값: true)
  role?: 'dialog' | 'alertdialog'; // 접근성: 모달 역할 (기본값: 'dialog')
  ariaLabel?: string; // 접근성: 모달 제목 (aria-label)
  ariaLabelledBy?: string; // 접근성: 모달 제목 요소 ID (aria-labelledby)
  id?: string; // 접근성: 모달 ID (aria-controls 연결용)
}
