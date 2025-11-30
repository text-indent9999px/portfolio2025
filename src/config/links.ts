/**
 * 외부 링크 설정
 * 환경 변수를 통해 관리되며, 배포 환경에 따라 다른 URL을 사용할 수 있습니다.
 */
export const EXTERNAL_LINKS = {
  /**
   * 스토리북 URL
   * 환경 변수 NEXT_PUBLIC_STORYBOOK_URL이 설정되지 않은 경우 빈 문자열을 반환합니다.
   */
  storybook: process.env.NEXT_PUBLIC_STORYBOOK_URL || '',
} as const;

/**
 * 스토리북 링크가 유효한지 확인
 */
export const isStorybookAvailable = (): boolean => {
  return Boolean(EXTERNAL_LINKS.storybook && EXTERNAL_LINKS.storybook !== '');
};
