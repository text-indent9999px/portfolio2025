import type { Meta, StoryObj } from '@storybook/nextjs';
import Blank from './Blank';

const meta: Meta<typeof Blank> = {
  title: 'UI/Blank',
  component: Blank,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Blank 컴포넌트는 요소 간 간격을 만들기 위한 빈 공간 요소입니다. margin 대신 사용할 수 있습니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    height: {
      control: 'text',
      description: '간격 높이를 지정합니다. 예: "2rem", "3rem", "1.5rem"',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0.5' },
        category: '레이아웃',
        description: '간격 높이를 지정합니다. 예: "2rem", "3rem", "1.5rem"',
      },
    },
    width: {
      control: 'text',
      description: '간격 너비를 지정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '100%' },
        category: '레이아웃',
        description: '간격 너비를 지정합니다.',
      },
    },
    bgColor: {
      control: 'text',
      description:
        '배경색을 지정합니다. transparent로 설정하면 보이지 않는 간격 요소로 사용할 수 있습니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--color-surface-level-1)' },
        category: '스타일',
        description:
          '배경색을 지정합니다. transparent로 설정하면 보이지 않는 간격 요소로 사용할 수 있습니다.',
      },
    },
    margin: {
      control: 'text',
      description: 'CSS margin 값을 지정합니다.',
      table: {
        type: { summary: 'string' },
        category: '레이아웃',
        description: 'CSS margin 값을 지정합니다.',
      },
    },
  },
  args: {
    height: '2rem',
    bgColor: 'transparent',
    width: '100%',
  },
};

export default meta;
type Story = StoryObj<typeof Blank>;

export const Default: Story = {
  render: args => (
    <div className="fixed top-0 left-0 w-full h-full p-8 overflow-auto">
      <div className="max-w-md mx-auto">
        <div className="bg-surface-level-2 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">첫 번째 섹션</h3>
          <p className="text-text-secondary">
            이 섹션 아래에 Blank로 간격을 줍니다.
          </p>
        </div>

        <Blank {...args} />

        <div className="bg-surface-level-2 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">두 번째 섹션</h3>
          <p className="text-text-secondary">
            Controls에서 Blank의 height와 bgColor를 조절해보세요.
          </p>
        </div>

        <Blank {...args} />

        <div className="bg-surface-level-2 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">세 번째 섹션</h3>
          <p className="text-text-secondary">
            margin 대신 Blank를 사용하여 요소 간 간격을 만들 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  ),
};
