import type { Meta, StoryObj } from '@storybook/nextjs';
import Label from './Label';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Label 컴포넌트는 텍스트를 강조하거나 분류하기 위한 작은 라벨입니다.',
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
      description: 'Label의 스타일 변형을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'filled' },
        category: '스타일',
        description: 'Label의 스타일 변형을 선택합니다.',
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
      description: 'Label의 색상을 선택합니다. 기본값은 primary입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
        category: '스타일',
        description: 'Label의 색상을 선택합니다. 기본값은 primary입니다.',
      },
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Label의 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'Label의 크기를 선택합니다.',
      },
    },
    rounded: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Label의 모서리 둥글기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'full' },
        category: '스타일',
        description: 'Label의 모서리 둥글기를 선택합니다.',
      },
    },
  },
  args: {
    children: 'Label',
    variant: 'filled',
    size: 'md',
    rounded: 'full',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
