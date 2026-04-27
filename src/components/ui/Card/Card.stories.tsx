import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Card는 `slots` prop으로 header / thumb / body / footer 콘텐츠를 넘깁니다. Body 안에서 블록 간 세로 간격은 CardStack을 사용합니다.',
      },
    },
  },
  argTypes: {
    appearance: {
      control: 'radio',
      options: ['solid', 'outline'],
      description:
        'solid는 테두리 없음, outline은 surfaceLevel 기준 테두리 색.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
        category: '스타일',
        description:
          'solid는 테두리 없음, outline은 surfaceLevel 기준 테두리 색.',
      },
    },
    elevation: {
      control: 'radio',
      options: [0, 1, 2, 3, 4],
      description:
        '0이면 그림자 없음. 1~4는 단계별 그림자. appearance가 outline이면 기본 0.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: '스타일',
        description:
          '0이면 그림자 없음. appearance가 outline이면 기본값 0.',
      },
    },
    surfaceLevel: {
      control: 'select',
      options: ['min', 1, 2, 3, 4, 5, 6, 7, 'max'],
      description:
        'Card의 배경 색상 레벨을 선택합니다. appearance가 outline일 때는 기본값이 min입니다.',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '1' },
        category: '스타일',
        description:
          'Card의 배경 색상 레벨을 선택합니다. appearance가 outline일 때는 기본값이 min입니다.',
      },
    },
    padding: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Card 내부의 패딩 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'Card 내부의 패딩 크기를 선택합니다.',
      },
    },
    thumbPosition: {
      control: 'radio',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'thumb 슬롯이 배치될 위치를 선택합니다.',
      table: {
        type: { summary: 'string' },
        category: '레이아웃',
        description: 'thumb 슬롯이 배치될 위치를 선택합니다.',
      },
    },
    ratio: {
      control: 'select',
      options: ['120px 1fr', '1fr 120px', 'auto 1fr', '1fr auto'],
      description:
        'Thumb과 Body의 비율을 선택합니다. 필요한 경우 코드를 수정해 직접 값을 지정할 수 있습니다.',
      table: {
        type: { summary: 'string' },
        category: '레이아웃',
        description:
          'Thumb과 Body의 비율을 선택합니다. 필요한 경우 코드를 수정해 직접 값을 지정할 수 있습니다.',
      },
    },
    gap: {
      control: 'text',
      description:
        'Thumb과 Body 사이의 간격을 지정합니다. 예: "8px", "0.75rem"',
      table: {
        type: { summary: 'string' },
        category: '레이아웃',
        description:
          'Thumb과 Body 사이의 간격을 지정합니다. 예: "8px", "0.75rem"',
      },
    },
  },
  args: {
    appearance: 'solid',
    elevation: 1,
    surfaceLevel: 1,
    padding: 'md',
    thumbPosition: 'left',
    ratio: '120px 1fr',
    gap: '12px',
    thumbAspect: '16/9',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const thumbSlot = (
  <div className="w-full h-full bg-success-500 rounded flex items-center justify-center">
    <span className="text-white font-bold">Thumb</span>
  </div>
);

const bodySlot = (
  <>
    <h3 className="text-lg mb-2 text-text-primary">카드 제목</h3>
    <p className="text-text-secondary">
      카드 본문 내용입니다. 컨트롤 패널에서 다양한 옵션을 조정해보세요.
    </p>
  </>
);

export const Default: Story = {
  render: args => <Card {...args} slots={{ thumb: thumbSlot, body: bodySlot }} />,
};

export const Outline: Story = {
  args: {
    appearance: 'outline',
    surfaceLevel: 'min',
    elevation: 0,
  },
  render: args => <Card {...args} slots={{ thumb: thumbSlot, body: bodySlot }} />,
};
