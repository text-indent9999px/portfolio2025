import type { Meta, StoryObj } from '@storybook/nextjs';
import { useId, useState } from 'react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**역할**  
부모가 \`position: relative\` 인 컨테이너 안에서 **절대 위치**로 뜨는 보조 설명 레이어입니다. \`fixed\`·좌표 계산·포털은 이 컴포넌트 범위 밖에서 다룹니다.

**접근성**  
- 툴팁 루트에는 \`role="tooltip"\`과 \`id\`가 붙습니다 (\`id\` 미지정 시 \`useId()\`).  
- **트리거** 요소에는 툴팁이 **보일 때만** \`aria-describedby={툴팁 id}\` 를 연결하는 것을 권장합니다. 숨긴 경우 DOM에서 툴팁이 사라지므로, 그때는 \`aria-describedby\`를 비워 두면 깨끗합니다.  
- 닫기 버튼이 있으면 포커스 가능 요소가 툴팁 내부에 있게 됩니다. 순수 “호버만” 툴팁이라면 \`pointer-events-none\` 등 패턴을 부모에서 선택할 수 있습니다.

**Default 스토리**  
열기 버튼과 툴팁 \`id\`를 맞춰 \`aria-describedby\` 예시를 넣었습니다. \`arrow\`는 Controls와 연동됩니다.
`.trim(),
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
      description:
        '외부 클릭 시 Tooltip을 닫을지 여부입니다. 컴포넌트 기본값은 false이며, 아래 샘플 args는 데모용으로 true일 수 있습니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '동작',
        description: '외부 클릭 시 `onClose`를 호출할지 여부.',
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
    arrow: true,
    closeOnOutsideClick: true,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: args => {
    const [isVisible, setIsVisible] = useState(args.isVisible ?? true);
    const tooltipId = useId();

    const bgClass = args.inverted ? 'bg-surface-level-max' : 'bg-transparent';

    return (
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${bgClass}`}
        style={{ zIndex: 0 }}
      >
        <div className="relative inline-flex items-center">
          <button
            type="button"
            aria-describedby={isVisible ? tooltipId : undefined}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            onPointerDown={e => {
              // Tooltip의 바깥 클릭은 document `pointerdown`으로 처리됨. 트리거는 툴팁 밖이므로
              // 전파를 막지 않으면 닫힌 뒤 같은 제스처의 click에서 토글이 한 번 더 먹는다.
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
            id={tooltipId}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            tooltipPosition={args.tooltipPosition || 'top'}
            arrow={args.arrow}
            closeOnOutsideClick={args.closeOnOutsideClick}
          >
            {args.children}
          </Tooltip>
        </div>
      </div>
    );
  },
};
