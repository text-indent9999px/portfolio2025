import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card 컴포넌트는 콘텐츠를 그룹화하고 표시하는 컨테이너입니다. Compound 패턴을 사용하여 Header, Thumb, Body, Footer를 구성할 수 있습니다.',
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
      options: ['default', 'outlined'],
      description: 'Card의 스타일 변형을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: '스타일',
        description: 'Card의 스타일 변형을 선택합니다.',
      },
    },
    elevation: {
      control: 'radio',
      options: [0, 1, 2, 3, 4],
      description:
        'Card의 그림자 레벨을 선택합니다. variant가 outlined일 때는 기본값이 0입니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: '스타일',
        description:
          'Card의 그림자 레벨을 선택합니다. variant가 outlined일 때는 기본값이 0입니다.',
      },
    },
    surfaceLevel: {
      control: 'radio',
      options: ['min', 1, 2, 3, 4, 5, 6, 7, 'max'],
      description:
        'Card의 배경 색상 레벨을 선택합니다. variant가 outlined일 때는 기본값이 min입니다.',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '1' },
        category: '스타일',
        description:
          'Card의 배경 색상 레벨을 선택합니다. variant가 outlined일 때는 기본값이 min입니다.',
      },
    },
    padding: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Card 내부의 패딩 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'Card 내부의 패딩 크기를 선택합니다.',
      },
    },
    thumbPosition: {
      control: 'radio',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Card.Thumb이 배치될 위치를 선택합니다.',
      table: {
        type: { summary: 'string' },
        category: '레이아웃',
        description: 'Card.Thumb이 배치될 위치를 선택합니다.',
      },
    },
    ratio: {
      control: 'radio',
      options: ['120px 1fr', '1fr 120px', 'auto 1fr', '1fr auto'],
      description:
        'Thumb과 Body의 비율을 선택합니다. 필요한 경우 코드를 수정해 직접 값을 지정할 수 있습니다.',
      table: {
        type: { summary: 'string' },
        category: '레이아웃',
        description:
          'Thumb과 Body의 비율을 선택합니다. 필요한 경우 코드를 수정해 직접 값을 지정할 수 있습니다.',
      },
    },
    gap: {
      control: 'text',
      description:
        'Thumb과 Body 사이의 간격을 지정합니다. 예: "8px", "0.75rem"',
      table: {
        type: { summary: 'string' },
        category: '레이아웃',
        description:
          'Thumb과 Body 사이의 간격을 지정합니다. 예: "8px", "0.75rem"',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'default',
    elevation: 1,
    surfaceLevel: 1,
    padding: 'md',
    thumbPosition: 'left',
    ratio: '120px 1fr',
    gap: '12px',
  },
  render: args => (
    <Card
      variant={args.variant}
      elevation={args.elevation}
      surfaceLevel={args.surfaceLevel}
      padding={args.padding}
      thumbPosition={args.thumbPosition}
      ratio={args.ratio}
      gap={args.gap}
    >
      <Card.Thumb aspect="16/9">
        <div className="w-full h-full bg-accent-400 rounded flex items-center justify-center">
          <span className="text-[#fff]">Thumb</span>
        </div>
      </Card.Thumb>
      <Card.Body>
        {/* 
          surfaceLevel에 따른 텍스트 색상 조정
          - surfaceLevel 4, 5: 배경이 밝아져서 어두운 텍스트 필요
          - 그 외: mix-blend-difference로 배경과 대비되는 색상 자동 적용
          주의: 실제 프로덕션에서는 Card 컴포넌트 내부에서 자동 처리하거나 
          별도 유틸 함수로 분리하는 것을 권장합니다.
        */}
        {(() => {
          // surfaceLevel에 따라 텍스트 색상 클래스 결정
          let textColorClass = 'text-[#fff]';
          if (args.surfaceLevel === 4) {
            textColorClass = 'text-[#555] dark:text-[#fff]';
          } else if (args.surfaceLevel === 5) {
            textColorClass = 'text-[#555] dark:text-[#ccc]';
          }

          return (
            <>
              <h3 className={`text-lg mb-2 mix-blend-difference ${textColorClass}`}>
                카드 제목
              </h3>
              <p className={`mix-blend-difference ${textColorClass}`}>
                카드 본문 내용입니다. 컨트롤 패널에서 다양한 옵션을 조정해보세요.
              </p>
            </>
          );
        })()}
      </Card.Body>
    </Card>
  ),
};
