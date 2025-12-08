import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Tab from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'UI/Tab/Secondary',
  component: Tab,
  parameters: {
    docs: {
      description: {
        component: 'Secondary Tab 컴포넌트는 스크롤 가능한 가로 탭 네비게이션을 제공합니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    uniqueId: {
      control: 'text',
      description: '탭 그룹을 구분하기 위한 고유 ID입니다. 접근성(aria-controls, aria-labelledby)에 사용됩니다.',
      table: {
        type: { summary: 'string' },
        category: '기본',
        description: '탭 그룹을 구분하기 위한 고유 ID입니다. 접근성(aria-controls, aria-labelledby)에 사용됩니다.',
      },
    },
    tabs: {
      control: 'object',
      description: '탭 아이템 배열입니다. 각 탭은 id, label, notification(선택)을 포함합니다.',
      table: {
        type: { summary: 'TabItem[]' },
        category: '기본',
        description: '탭 아이템 배열입니다. 각 탭은 id, label, notification(선택)을 포함합니다.',
      },
    },
    activeTab: {
      control: 'text',
      description: '현재 활성화된 탭의 ID입니다.',
      table: {
        type: { summary: 'string' },
        category: '기본',
        description: '현재 활성화된 탭의 ID입니다.',
      },
    },
    onTabChange: {
      control: false,
      description: '탭이 변경될 때 호출되는 콜백 함수입니다.',
      table: {
        type: { summary: '(tabId: string) => void' },
        category: '동작',
        description: '탭이 변경될 때 호출되는 콜백 함수입니다.',
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스를 지정합니다.',
      table: {
        type: { summary: 'string' },
        category: '스타일',
        description: '추가 CSS 클래스를 지정합니다.',
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
  },
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const tabs = [
      { id: 'tab1', label: '첫번째 탭' },
      { id: 'tab2', label: '두번째 탭', notification: 3 },
      { id: 'tab3', label: '세번째 탭' },
    ];

    return (
      <div>
        <Tab
          uniqueId="secondary-demo"
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="mt-6 space-y-2">
          {tabs.map(tab => (
            <div
              key={tab.id}
              id={`panel-${tab.id}-secondary-demo`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}-secondary-demo`}
              hidden={activeTab !== tab.id}
              className="p-4 border border-dashed border-surface-level-4 rounded-lg"
            >
              {tab.label} 패널 내용
            </div>
          ))}
        </div>
      </div>
    );
  },
};

