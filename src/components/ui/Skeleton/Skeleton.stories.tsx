import type { Meta, StoryObj } from '@storybook/nextjs';
import { Skeleton } from '.';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          'Skeleton 컴포넌트는 콘텐츠 로딩 중 레이아웃 안정성을 유지하기 위한 플레이스홀더입니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    width: {
      control: 'text',
      table: { category: '크기' },
      description: '너비를 지정합니다. (예: 120, "12rem", "100%")',
    },
    height: {
      control: 'text',
      table: { category: '크기' },
      description: '높이를 지정합니다. (예: 16, "1rem", "8rem")',
    },
    radius: {
      control: 'text',
      table: { category: '스타일' },
      description:
        '모서리 곡률을 지정합니다. 예: "0.875rem", "12px", "none", "full"',
    },
    animated: {
      name: 'shimmer',
      control: 'boolean',
      table: { category: '스타일' },
      description: 'shimmer 애니메이션 사용 여부입니다.',
    },
  },
  args: {
    width: '100%',
    height: '1.5rem',
    radius: '1.5rem',
    animated: true,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Lines: Story = {
  args: {
    width: '100%',
    height: '1.5rem',
    radius: '1.5rem',
  },
  render: args => (
    <div className="w-[320px] flex flex-col gap-2">
      <Skeleton {...args} />
      <Skeleton {...args} width="82%" />
      <Skeleton {...args} width="64%" />
    </div>
  ),
};
