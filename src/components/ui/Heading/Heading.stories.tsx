import type { Meta, StoryObj } from '@storybook/nextjs';
import Heading from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'UI/Heading',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: 'Heading 컴포넌트는 제목을 표시하는 컴포넌트로, 시맨틱한 HTML 태그(h1~h6)를 사용합니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: [1, 2, 3, 4, 5, 6, 7, 8],
      description: 'HTML 태그 레벨(1-8)을 지정합니다. 6보다 크면 h6로 렌더링됩니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
        category: '기본',
        description: 'HTML 태그 레벨(1-8)을 지정합니다. 6보다 크면 h6로 렌더링됩니다.',
      },
    },
    visualSize: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: '실제 표시되는 크기를 지정합니다. size보다 우선순위가 높습니다.',
      table: {
        type: { summary: 'string' },
        category: '스타일',
        description: '실제 표시되는 크기를 지정합니다. size보다 우선순위가 높습니다.',
      },
    },
    fontFamily: {
      control: 'radio',
      options: ['default', 'kor-point', 'eng-point'],
      description: '사용할 폰트 패밀리를 선택합니다. kor-point는 한글 포인트 폰트, eng-point는 영문 포인트 폰트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: '스타일',
        description: '사용할 폰트 패밀리를 선택합니다. kor-point는 한글 포인트 폰트, eng-point는 영문 포인트 폰트입니다.',
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스를 지정합니다.',
      table: {
        type: { summary: 'string' },
        category: '스타일',
        description: '추가 CSS 클래스를 지정합니다.',
      },
    },
  },
  args: {
    children: 'Heading Title',
    size: 2,
    className: 'text-text-primary',
  },
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const KorPointFont: Story = {
  args: {
    fontFamily: 'kor-point',
    children: '한글 제목 텍스트',
  },
};
