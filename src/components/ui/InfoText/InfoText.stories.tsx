import type { Meta, StoryObj } from '@storybook/nextjs';
import InfoText from './InfoText';

const meta: Meta<typeof InfoText> = {
  title: 'UI/InfoText',
  component: InfoText,
  parameters: {
    docs: {
      description: {
        component: 'InfoText 컴포넌트는 정보, 성공, 경고, 에러 등의 메시지를 표시하는 컴포넌트입니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'InfoText의 타입을 선택합니다. 타입에 따라 색상과 아이콘이 변경됩니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info' },
        category: '기본',
        description: 'InfoText의 타입을 선택합니다. 타입에 따라 색상과 아이콘이 변경됩니다.',
      },
    },
    title: {
      control: 'text',
      description: 'InfoText의 제목을 지정합니다.',
      table: {
        type: { summary: 'string' },
        category: '콘텐츠',
        description: 'InfoText의 제목을 지정합니다.',
      },
    },
    showIcon: {
      control: 'boolean',
      description: '타입에 맞는 아이콘을 표시할지 여부를 결정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: '스타일',
        description: '타입에 맞는 아이콘을 표시할지 여부를 결정합니다.',
      },
    },
  },
  args: {
    type: 'info',
    title: '안내',
    children: '이 영역은 토큰 기반 색상으로 스타일링됩니다.',
    showIcon: true,
  },
};
export default meta;

type Story = StoryObj<typeof InfoText>;

export const Info: Story = {};
export const Success: Story = { args: { type: 'success', title: '성공' } };
export const Warning: Story = { args: { type: 'warning', title: '주의' } };
export const Danger: Story = { args: { type: 'danger', title: '에러' } };
