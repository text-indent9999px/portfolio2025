import type { Meta, StoryObj } from '@storybook/nextjs';
import ColorChip from './ColorChip';

const meta: Meta<typeof ColorChip> = {
  title: 'UI/ColorChip',
  component: ColorChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ColorChip 컴포넌트는 색상을 시각적으로 표시하는 칩입니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    colorType: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'gray'],
      description: '색상 타입을 선택합니다. CSS 변수(--color-{colorType}-{shade})를 사용하여 색상을 가져옵니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
        category: '기본',
        description: '색상 타입을 선택합니다. CSS 변수(--color-{colorType}-{shade})를 사용하여 색상을 가져옵니다.',
      },
    },
    shade: {
      control: 'number',
      description: '색상의 shade 값을 지정합니다. 예: 50, 100, 200, ..., 900',
      table: {
        type: { summary: 'string | number' },
        category: '기본',
        description: '색상의 shade 값을 지정합니다. 예: 50, 100, 200, ..., 900',
      },
    },
    variant: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'ColorChip의 모양을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'circle' },
        category: '스타일',
        description: 'ColorChip의 모양을 선택합니다.',
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'ColorChip의 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'ColorChip의 크기를 선택합니다.',
      },
    },
  },
  args: {
    colorType: 'primary',
    shade: 500,
  },
};

export default meta;
type Story = StoryObj<typeof ColorChip>;

export const Default: Story = {};

