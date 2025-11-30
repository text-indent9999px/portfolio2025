import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip 컴포넌트는 요소에 대한 추가 정보를 표시하는 작은 팝오버입니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: 'Tooltip의 표시 여부를 제어합니다.',
      table: {
        type: { summary: 'boolean' },
        category: '기본',
        description: 'Tooltip의 표시 여부를 제어합니다.',
      },
    },
    tooltipPosition: {
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip이 표시될 위치를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
        category: '레이아웃',
        description: 'Tooltip이 표시될 위치를 선택합니다.',
      },
    },
    arrow: {
      control: 'boolean',
      description: 'Tooltip에 화살표를 표시합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '스타일',
        description: 'Tooltip에 화살표를 표시합니다.',
      },
    },
    arrowPosition: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      description:
        '화살표의 위치를 선택합니다. arrow가 true일 때만 적용됩니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'center' },
        category: '스타일',
        description:
          '화살표의 위치를 선택합니다. arrow가 true일 때만 적용됩니다.',
      },
    },
    inverted: {
      control: 'boolean',
      description: '툴팁의 색상을 반전시킵니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '스타일',
        description: '툴팁의 색상을 반전시킵니다.',
      },
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: '외부 클릭 시 Tooltip을 닫을지 여부를 결정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: '동작',
        description: '외부 클릭 시 Tooltip을 닫을지 여부를 결정합니다.',
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Tooltip에 닫기 버튼을 표시합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '동작',
        description: 'Tooltip에 닫기 버튼을 표시합니다.',
      },
    },
  },
  args: {
    isVisible: true,
    children: 'Tooltip 내용\n여러줄 입력 가능합니다.',
    tooltipPosition: 'top',
    closeOnOutsideClick: true,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: args => {
    // Tooltip의 표시/숨김 상태를 관리하기 위한 로컬 state
    // Storybook의 args.isVisible과 동기화하기 위해 useState 사용
    // 실제 사용 시에는 부모 컴포넌트에서 상태를 관리합니다.
    const [isVisible, setIsVisible] = useState(args.isVisible ?? true);

    // inverted prop에 따라 배경색 변경 (밝은 배경에서 inverted 툴팁 테스트용)
    const bgClass = args.inverted ? 'bg-surface-level-max' : 'transparent';

    return (
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${bgClass}`}
        style={{ zIndex: 0 }}
      >
        <div className="relative inline-flex items-center">
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            onMouseDown={e => {
              e.stopPropagation();
            }}
            onClick={e => {
              e.stopPropagation();
              setIsVisible(!isVisible);
            }}
          >
            {isVisible ? '툴팁 닫기' : '툴팁 열기'}
          </button>
          <Tooltip
            {...args}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            tooltipPosition={args.tooltipPosition || 'top'}
            arrow={true}
            closeOnOutsideClick={args.closeOnOutsideClick}
          >
            {args.children}
          </Tooltip>
        </div>
      </div>
    );
  },
};
