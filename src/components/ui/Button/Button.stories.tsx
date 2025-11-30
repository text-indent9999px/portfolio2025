import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button 컴포넌트는 사용자 액션을 트리거하는 클릭 가능한 요소입니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['filled', 'tonal', 'outlined', 'ghost', 'text'],
      description: 'Button의 스타일 변형을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'filled' },
        category: '스타일',
        description: 'Button의 스타일 변형을 선택합니다.',
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button의 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'Button의 크기를 선택합니다.',
      },
    },
    color: {
      control: 'radio',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'gray',
      ],
      description: 'Button의 색상을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
        category: '스타일',
        description: 'Button의 색상을 선택합니다.',
      },
    },
    rounded: {
      control: 'radio',
      options: ['none', 'sm', 'lg', 'full', 'circle'],
      description: 'Button의 모서리 둥글기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'lg' },
        category: '스타일',
        description: 'Button의 모서리 둥글기를 선택합니다.',
      },
    },
    noHoverActive: {
      control: 'boolean',
      description: 'hover 및 active 상태의 스타일 효과를 비활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '동작',
        description: 'hover 및 active 상태의 스타일 효과를 비활성화합니다.',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Button을 비활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '동작',
        description: 'Button을 비활성화합니다.',
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Button이 부모 요소의 전체 너비를 차지하도록 합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '레이아웃',
        description: 'Button이 부모 요소의 전체 너비를 차지하도록 합니다.',
      },
    },
    cursorTrigger: {
      control: 'boolean',
      description: '커스텀 커서 효과를 활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: '동작',
        description: '커스텀 커서 효과를 활성화합니다.',
      },
    },
    icon: {
      control: 'text',
      description: 'Button에 표시할 아이콘입니다. ReactNode를 받을 수 있습니다.',
      table: {
        type: { summary: 'React.ReactNode' },
        category: '콘텐츠',
        description: 'Button에 표시할 아이콘입니다. ReactNode를 받을 수 있습니다.',
      },
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: '아이콘의 위치를 선택합니다. icon이 지정되어 있을 때만 적용됩니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
        category: '콘텐츠',
        description: '아이콘의 위치를 선택합니다. icon이 지정되어 있을 때만 적용됩니다.',
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'md',
    color: 'primary',
    rounded: 'lg',
    noHoverActive: false,
    disabled: false,
    fullWidth: false,
    cursorTrigger: true,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: '⭐',
    iconPosition: 'left',
    children: 'With Icon',
  },
};

export const IconOnly: Story = {
  args: {
    icon: '⭐',
    children: '',
    rounded: 'circle',
  },
};
