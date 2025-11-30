import type { Meta, StoryObj } from '@storybook/nextjs';
import Description from './Description';

const meta: Meta<typeof Description> = {
  title: 'UI/Description',
  component: Description,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description 컴포넌트는 본문 텍스트를 표시하는 컴포넌트입니다.',
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
      description: '텍스트의 크기를 선택합니다 (1-8).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
        category: '스타일',
        description: '텍스트의 크기를 선택합니다 (1-8).',
      },
    },
    color: {
      control: 'text',
      description: '텍스트 색상을 지정합니다. Tailwind 클래스를 사용합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text-text-secondary' },
        category: '스타일',
        description: '텍스트 색상을 지정합니다. Tailwind 클래스를 사용합니다.',
      },
    },
    leading: {
      control: 'radio',
      options: ['tight', 'normal', 'relaxed', '7'],
      description: '줄 간격을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'relaxed' },
        category: '스타일',
        description: '줄 간격을 선택합니다.',
      },
    },
    weight: {
      control: 'radio',
      options: ['normal', 'medium', 'semibold'],
      description: '텍스트의 굵기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'normal' },
        category: '스타일',
        description: '텍스트의 굵기를 선택합니다.',
      },
    },
    preserveWhitespace: {
      control: 'boolean',
      description: '줄바꿈과 공백을 보존합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '스타일',
        description: '줄바꿈과 공백을 보존합니다.',
      },
    },
    breakKeep: {
      control: 'boolean',
      description: '단어가 줄바꿈될 때 분리되지 않도록 합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '스타일',
        description: '단어가 줄바꿈될 때 분리되지 않도록 합니다.',
      },
    },
  },
  args: {
    children: '설명 텍스트입니다.',
  },
};

export default meta;
type Story = StoryObj<typeof Description>;

export const Default: Story = {};

