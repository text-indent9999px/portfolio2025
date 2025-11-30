import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Tab from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'UI/Tab/Primary',
  component: Tab,
  parameters: {
    docs: {
      description: {
        component:
          'Primary Tab 컴포넌트는 수평 또는 수직 방향의 탭 네비게이션을 제공합니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description:
        '탭의 방향을 선택합니다. horizontal은 가로, vertical은 세로입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
        category: '레이아웃',
        description:
          '탭의 방향을 선택합니다. horizontal은 가로, vertical은 세로입니다.',
      },
    },
    enableTransition: {
      control: 'boolean',
      description: '탭 전환 시 인디케이터 애니메이션을 활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: '동작',
        description: '탭 전환 시 인디케이터 애니메이션을 활성화합니다.',
      },
    },
  },
  args: {
    uniqueId: 'demo',
    tabs: [
      { id: 'tab1', label: '첫번째 탭' },
      { id: 'tab2', label: '두번째 탭', notification: 3 },
      { id: 'tab3', label: '세번째 탭' },
    ],
    activeTab: 'tab1',
    onTabChange: (id: string) => console.log('active tab:', id),
    enableTransition: true,
  },
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  render: args => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div>
        <Tab {...args} activeTab={activeTab} onTabChange={setActiveTab} />
        {/* Mock panels for accessibility - aria-controls 참조용 */}
        <div
          id="panel-tab1-demo"
          role="tabpanel"
          aria-labelledby="tab-tab1-demo"
          style={{ display: 'none' }}
        >
          Mock content for Tab 1
        </div>
        <div
          id="panel-tab2-demo"
          role="tabpanel"
          aria-labelledby="tab-tab2-demo"
          style={{ display: 'none' }}
        >
          Mock content for Tab 2
        </div>
        <div
          id="panel-tab3-demo"
          role="tabpanel"
          aria-labelledby="tab-tab3-demo"
          style={{ display: 'none' }}
        >
          Mock content for Tab 3
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: args => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div>
        <Tab {...args} activeTab={activeTab} onTabChange={setActiveTab} />
        {/* Mock panels for accessibility - aria-controls 참조용 */}
        <div
          id="panel-tab1-demo"
          role="tabpanel"
          aria-labelledby="tab-tab1-demo"
          style={{ display: 'none' }}
        >
          Mock content for Tab 1
        </div>
        <div
          id="panel-tab2-demo"
          role="tabpanel"
          aria-labelledby="tab-tab2-demo"
          style={{ display: 'none' }}
        >
          Mock content for Tab 2
        </div>
        <div
          id="panel-tab3-demo"
          role="tabpanel"
          aria-labelledby="tab-tab3-demo"
          style={{ display: 'none' }}
        >
          Mock content for Tab 3
        </div>
      </div>
    );
  },
};
