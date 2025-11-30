import type { Meta, StoryObj } from '@storybook/nextjs';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Spinner 컴포넌트는 로딩 상태를 표시하는 애니메이션 컴포넌트입니다.',
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
      options: ['sm', 'md', 'lg'],
      description: 'Spinner의 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'Spinner의 크기를 선택합니다.',
      },
    },
    type: {
      control: 'radio',
      options: ['normal', 'inverted'],
      description:
        'Spinner의 색상 타입을 선택합니다. inverted는 밝은 배경에 사용합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' },
        category: '스타일',
        description:
          'Spinner의 색상 타입을 선택합니다. inverted는 밝은 배경에 사용합니다.',
      },
    },
    showText: {
      control: 'boolean',
      description: '로딩 텍스트를 표시할지 여부를 결정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '콘텐츠',
        description: '로딩 텍스트를 표시할지 여부를 결정합니다.',
      },
    },
    text: {
      control: 'text',
      description:
        '표시할 로딩 텍스트를 지정합니다. showText가 true일 때만 표시됩니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ' Loading...' },
        category: '콘텐츠',
        description:
          '표시할 로딩 텍스트를 지정합니다. showText가 true일 때만 표시됩니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: args => {
    const bgClass =
      args.type === 'inverted' ? 'bg-surface-level-max' : 'transparent';
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${bgClass}`}
        style={{ zIndex: 0 }}
      >
        <Spinner {...args} />
      </div>
    );
  },
};
