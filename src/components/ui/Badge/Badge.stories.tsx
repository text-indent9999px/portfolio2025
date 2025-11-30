import type { Meta, StoryObj } from '@storybook/nextjs';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge 컴포넌트는 알림, 카운트, 상태 등을 표시하는 작은 라벨입니다.',
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
      description: 'Badge의 스타일 변형을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'filled' },
        category: '스타일',
        description: 'Badge의 스타일 변형을 선택합니다.',
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
      description: 'Badge의 색상을 선택합니다. 기본값은 primary입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
        category: '스타일',
        description: 'Badge의 색상을 선택합니다. 기본값은 primary입니다.',
      },
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Badge의 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'Badge의 크기를 선택합니다.',
      },
    },
    shape: {
      control: 'radio',
      options: ['circle', 'pill', 'rounded', 'square'],
      description: 'Badge의 모양을 선택합니다. circle은 숫자 배지에 적합합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'circle' },
        category: '스타일',
        description: 'Badge의 모양을 선택합니다. circle은 숫자 배지에 적합합니다.',
      },
    },
    children: {
      control: 'text',
      description:
        'Badge에 표시할 텍스트입니다. count가 지정되지 않은 경우에만 표시됩니다. count가 있으면 children은 무시되고 count가 우선적으로 표시됩니다.',
      table: {
        type: { summary: 'React.ReactNode' },
        category: '콘텐츠',
        description:
          'Badge에 표시할 텍스트입니다. count가 지정되지 않은 경우에만 표시됩니다. count가 있으면 children은 무시되고 count가 우선적으로 표시됩니다.',
      },
    },
    count: {
      control: 'number',
      description:
        'Badge에 표시할 숫자입니다. count가 지정되면 children은 무시되고 숫자만 표시됩니다. count가 없을 때만 children이 표시됩니다. showZero가 false이면 0일 때는 표시되지 않습니다.',
      table: {
        type: { summary: 'number' },
        category: '콘텐츠',
        description:
          'Badge에 표시할 숫자입니다. count가 지정되면 children은 무시되고 숫자만 표시됩니다. count가 없을 때만 children이 표시됩니다. showZero가 false이면 0일 때는 표시되지 않습니다.',
      },
    },
    maxCount: {
      control: 'number',
      description: '표시할 수 있는 최대 숫자입니다. 이를 초과하면 "99+" 형태로 표시됩니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' },
        category: '콘텐츠',
        description: '표시할 수 있는 최대 숫자입니다. 이를 초과하면 "99+" 형태로 표시됩니다.',
      },
    },
    showZero: {
      control: 'boolean',
      description: 'count가 0일 때도 표시할지 여부를 결정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '콘텐츠',
        description: 'count가 0일 때도 표시할지 여부를 결정합니다.',
      },
    },
  },
  args: {
    children: 'Badge',
    variant: 'filled',
    size: 'md',
    shape: 'circle',
    count: undefined,
    maxCount: 99,
    showZero: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const WithCount: Story = {
  args: {
    count: 5,
    children: undefined,
  },
};
