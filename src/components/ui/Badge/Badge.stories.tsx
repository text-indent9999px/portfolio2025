import type { Meta, StoryObj } from '@storybook/nextjs';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge 컴포넌트는 알림, 카운트, 상태 등을 표시하는 작은 라벨입니다. variant는 프리셋 이름이고, color는 semantic tone 기준으로 의미를 전달합니다. 스타일은 장식용에 맞춰 hover 등 인터랙션 강조는 최소화되어 있습니다.',
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
      description: 'Badge의 프리셋 스타일을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
        category: '스타일',
        description: 'Badge의 프리셋 스타일을 선택합니다.',
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
      description: 'Badge의 semantic tone을 선택합니다. 기본값은 brand입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'brand' },
        category: '스타일',
        description:
          'Badge의 semantic tone을 선택합니다. 기본값은 brand입니다.',
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
      description:
        'Badge의 모양을 선택합니다. circle은 숫자 배지에 적합합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'circle' },
        category: '스타일',
        description:
          'Badge의 모양을 선택합니다. circle은 숫자 배지에 적합합니다.',
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
      description:
        '표시할 수 있는 최대 숫자입니다. 이를 초과하면 "99+" 형태로 표시됩니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' },
        category: '콘텐츠',
        description:
          '표시할 수 있는 최대 숫자입니다. 이를 초과하면 "99+" 형태로 표시됩니다.',
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
    maxWidth: {
      control: 'text',
      description:
        '비원형(shape가 circle이 아닐 때)에서 텍스트 영역 최대 너비. 예: 8rem, 128(px는 숫자로도 가능)',
      table: {
        type: { summary: 'string | number' },
        category: '레이아웃',
      },
    },
    position: {
      control: 'radio',
      options: ['static', 'relative', 'absolute'],
      description:
        'absolute일 때 anchor로 부모(보통 position:relative 래퍼) 기준 모서리 정렬을 씁니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'static' },
        category: '레이아웃',
      },
    },
    anchor: {
      control: 'select',
      options: [
        undefined,
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'center-left',
        'center-right',
      ],
      description: 'position이 absolute일 때만 적용됩니다.',
      table: {
        type: { summary: 'BadgeAnchor' },
        category: '레이아웃',
      },
    },
    offset: {
      control: 'object',
      description:
        '앵커 기준 미세 이동. { top?, right?, bottom?, left? }에 CSS 길이 문자열(예: "4px")',
      table: {
        type: { summary: 'BadgeOffset' },
        category: '레이아웃',
      },
    },
    ariaLabel: {
      control: 'text',
      description: '스크린 리더용 라벨',
      table: { category: '접근성' },
    },
    ariaLive: {
      control: 'radio',
      options: ['off', 'polite', 'assertive'],
      description: 'off가 아니면 role=status 및 aria-live 적용',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'off' },
        category: '접근성',
      },
    },
    icon: {
      control: false,
      description: '아이콘 슬롯(ReactNode). Controls에서는 조작하지 않습니다.',
      table: { category: '콘텐츠' },
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
        category: '콘텐츠',
      },
    },
    className: {
      control: 'text',
      description: '추가 Tailwind/클래스',
      table: { category: '스타일' },
    },
  },
  args: {
    children: 'Badge',
    variant: 'solid',
    color: 'brand',
    size: 'md',
    shape: 'circle',
    count: undefined,
    maxCount: 99,
    showZero: false,
    position: 'static',
    ariaLive: 'off',
    iconPosition: 'left',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: args => (
    <div className="relative inline-flex items-center justify-center">
      <div className="relative p-2 flex items-center justify-center flex-wrap gap-1 rounded-lg bg-neutral-200 dark:bg-neutral-700">
        <span className="text-xs text-neutral-600 dark:text-neutral-300">
          부모 영역 박스
        </span>
        <Badge {...args} />
      </div>
    </div>
  ),
};

export const WithCount: Story = {
  args: {
    count: 5,
    children: undefined,
  },
};
