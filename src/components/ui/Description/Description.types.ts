export type DescriptionSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface DescriptionProps {
  children: React.ReactNode;
  /**
   * 본문 타이포 스케일(1~8). 숫자는 Heading 등과 맞출 수 있으나, 실제 글자 크기 매핑은 Description 전용이다.
   */
  size?: DescriptionSize;
  /**
   * 본문에 붙는 Tailwind 클래스(색·강조 등). 여 클래스를 공백으로 나열할 수 있다.
   */
  textClassName?: string;
  className?: string;
  leading?: 'tight' | 'normal' | 'relaxed' | '7';
  weight?: 'normal' | 'medium' | 'semibold';
  preserveWhitespace?: boolean;
  breakKeep?: boolean;
}
