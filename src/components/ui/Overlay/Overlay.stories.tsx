import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Overlay from './Overlay';

const meta: Meta<typeof Overlay> = {
  title: 'UI/Overlay',
  component: Overlay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '오버레이 컴포넌트는 배경 위에 반투명 레이어를 표시하고, 필요시 blur 효과를 적용할 수 있습니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '오버레이 표시 여부를 제어합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '기본',
        description: '오버레이 표시 여부를 제어합니다.',
      },
    },
    blur: {
      control: 'boolean',
      description:
        '배경에 blur 효과를 적용합니다. 뒤의 콘텐츠가 흐려지는 효과를 볼 수 있습니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '스타일',
        description:
          '배경에 blur 효과를 적용합니다. 뒤의 콘텐츠가 흐려지는 효과를 볼 수 있습니다.',
      },
    },
    lockScroll: {
      control: 'boolean',
      description:
        '오버레이가 열렸을 때 body 스크롤을 잠급니다. 기본값은 true입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: '동작',
        description:
          '오버레이가 열렸을 때 body 스크롤을 잠급니다. 기본값은 true입니다.',
      },
    },
    unstyled: {
      control: 'boolean',
      description:
        '기본 스타일을 제거하고 커스텀 클래스를 적용할 수 있게 합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '스타일',
        description:
          '기본 스타일을 제거하고 커스텀 클래스를 적용할 수 있게 합니다.',
      },
    },
  },
  args: {
    open: true,
    blur: false,
    lockScroll: true,
    unstyled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Overlay>;

// 배경 콘텐츠 컴포넌트 - blur 효과를 보여주기 위한 예시 콘텐츠
const BackgroundContent = ({
  onToggleOverlay,
  isOpen,
}: {
  onToggleOverlay: () => void;
  isOpen: boolean;
}) => {
  const cardData = [
    {
      title: '카드 1',
      content:
        '대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다. 국민은 법률이 정하는 바에 의하여 선거권을 가진다.',
    },
    {
      title: '카드 2',
      content:
        '모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 정치적·경제적·사회적·문화적 생활의 모든 영역에 있어서 차별을 받지 아니한다.',
    },
    {
      title: '카드 3',
      content:
        '모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다. 국가는 개인이 가지는 불가침의 기본적 인권을 확인하고 이를 보장할 의무를 진다.',
    },
    {
      title: '카드 4',
      content:
        '모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다. 모든 국민은 거주·이전의 자유를 가진다.',
    },
    {
      title: '카드 5',
      content:
        '모든 국민은 직업선택의 자유를 가진다. 모든 국민은 학문과 예술의 자유를 가진다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써 보호한다.',
    },
    {
      title: '카드 6',
      content:
        '모든 국민은 양심의 자유를 가진다. 모든 국민은 종교의 자유를 가진다. 국교는 인정되지 아니하며, 종교와 정치는 분리된다.',
    },
  ];

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">배경 콘텐츠</h3>
        <button
          onClick={onToggleOverlay}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          {isOpen ? '오버레이 닫기' : '오버레이 열기'}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-1 overflow-auto">
        {cardData.map((card, index) => (
          <div key={index} className="bg-surface-level-1 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">{card.title}</h4>
            <p className="text-sm text-text-secondary">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 오버레이 모달 콘텐츠 컴포넌트
const OverlayModal = ({ onClose }: { onClose: () => void }) => (
  <div className="flex items-center justify-center h-full">
    <div className="bg-surface-level-1 p-8 rounded-lg shadow-lg border-2 border-surface-level-2 max-w-md">
      <h3 className="text-xl font-bold mb-4">오버레이 모달</h3>
      <p className="mb-4 text-text-secondary">
        모든 국민은 법률이 정하는 바에 의하여 국가기관에 문서로 청원할 권리를
        가진다. 국가는 청원에 대하여 심사할 의무를 진다.
      </p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        닫기
      </button>
    </div>
  </div>
);

export const Default: Story = {
  render: args => {
    // 오버레이 열림/닫힘 상태 관리
    // Storybook의 args.open과 동기화하기 위해 useState 사용
    const [open, setOpen] = useState(args.open ?? true);

    const handleToggle = () => setOpen(!open);
    const handleClose = () => setOpen(false);

    return (
      <div className="relative w-[800px] h-[600px] border-2 border-dashed border-surface-level-5 rounded-lg overflow-hidden">
        {/* 배경 콘텐츠 - blur 효과가 잘 보이도록 배치 */}
        <BackgroundContent onToggleOverlay={handleToggle} isOpen={open} />

        {/* 오버레이 */}
        <Overlay {...args} open={open} onClick={handleClose}>
          <OverlayModal onClose={handleClose} />
        </Overlay>
      </div>
    );
  },
};
