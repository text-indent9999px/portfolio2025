import type { Meta, StoryObj } from '@storybook/nextjs';

import { Video } from './Video';

/** 디자인시스템 프로젝트에서 사용하는 실제 public 비디오 샘플 */
const SAMPLE_MP4 = '/assets/videos/storybook-theme-toggle.mp4';

const meta: Meta<typeof Video> = {
  title: 'UI/Video',
  component: Video,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
프로젝트 **데모 탭**용 비디오 카드입니다. \`Card\` 본문 슬롯에 \`figure\`·\`video\`(또는 썸네일+재생)를 넣습니다.

- **썸네일 없음**: 마운트 시 곧바로 \`<video>\`를 렌더합니다.
- **썸네일 있음**: 썸네일 위에 재생 UI를 올려 두고, 재생 후 \`<video>\`로 바꿉니다. 썸네일에서 연 경우 재생 직후 \`tabIndex={-1}\` 비디오에 포커스를 옮겨 키보드 사용자가 컨트롤을 찾기 쉽게 합니다.
- 재생 버튼은 \`data-video-play-button\`으로 지정해, 포커스 루프 시 \`querySelector('button')\`처럼 애매하게 잡지 않습니다.
`.trim(),
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    src: {
      description: 'mp4 등 비디오 소스 URL',
      table: { category: '필수' },
    },
    width: {
      description: '표시 너비(숫자). `NextImage`·비율 계산에 사용',
      table: { category: '필수' },
    },
    height: {
      description: '표시 높이(숫자)',
      table: { category: '필수' },
    },
    thumbnail: {
      description: '있으면 클릭/키보드로 전환 재생',
      table: { category: '선택' },
    },
    title: { table: { category: '콘텐츠' } },
    description: { table: { category: '콘텐츠' } },
    contextTitle: { table: { category: '접근성' } },
    index: { table: { category: '접근성' } },
    autoPlay: { table: { category: '재생' } },
    loop: { table: { category: '재생' } },
    muted: { table: { category: '재생' } },
    controls: { table: { category: '재생' } },
    className: { table: { category: '스타일' } },
  },
};

export default meta;
type Story = StoryObj<typeof Video>;

export const Default: Story = {
  args: {
    src: SAMPLE_MP4,
    width: 640,
    height: 360,
    title: '샘플 비디오',
    description: '썸네일이 없으면 바로 `<video>`가 보이고 자동 재생됩니다(음소거 기본).',
    contextTitle: 'Storybook',
    index: 1,
  },
};

export const WithThumbnail: Story = {
  args: {
    src: SAMPLE_MP4,
    width: 640,
    height: 360,
    title: '썸네일 후 재생',
    description:
      '썸네일은 `public`의 정적 파일을 쓰는 예시입니다. 재생 후 포커스가 비디오로 이동합니다.',
    thumbnail: '/assets/images/storybook-dark.png',
    autoPlay: true,
    muted: true,
    controls: true,
  },
};
