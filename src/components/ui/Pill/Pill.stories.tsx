import type { Meta, StoryObj } from '@storybook/nextjs';
import Pill from './Pill';

const meta: Meta<typeof Pill> = {
  title: 'UI/Pill',
  component: Pill,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pill은 분류·메타를 보여 주는 작은 인라인 조각이다. variant는 프리셋, color는 semantic tone이다. 클릭이 필요하면 Button을 쓴다.',
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
      options: ['solid', 'soft', 'outline', 'minimal', 'plain'],
      description: '프리셋 스타일',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
        category: '스타일',
      },
    },
    color: {
      control: 'radio',
      options: [
        'brand',
        'subBrand',
        'success',
        'warning',
        'error',
        'info',
        'neutral',
      ],
      description: 'semantic tone (기본 brand)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'brand' },
        category: '스타일',
      },
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: '크기',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
      },
    },
    rounded: {
      control: 'radio',
      options: ['none', 'sm', 'md', 'lg', 'pill'],
      description: '모서리',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pill' },
        category: '스타일',
      },
    },
  },
  args: {
    children: 'Pill',
    variant: 'solid',
    size: 'md',
    rounded: 'pill',
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Default: Story = {};
