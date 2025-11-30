export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  blur?: boolean; // 배경 블러 여부
  lockScroll?: boolean; // 오픈 시 body 스크롤 잠금
  unstyled?: boolean; // 커스텀 클래스 적용 여부
}
