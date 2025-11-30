import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: 'Toggle 컴포넌트는 on/off 상태를 전환하는 스위치입니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Toggle의 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'Toggle의 크기를 선택합니다.',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Toggle을 비활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: '동작',
        description: 'Toggle을 비활성화합니다.',
      },
    },
    enableTransition: {
      control: 'boolean',
      description: '상태 전환 시 애니메이션 효과를 활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: '동작',
        description: '상태 전환 시 애니메이션 효과를 활성화합니다.',
      },
    },
  },
  args: {
    size: 'md',
    disabled: false,
    enableTransition: true,
  },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

/**
 * StatefulToggle 컴포넌트
 * 
 * Toggle 컴포넌트는 제어 컴포넌트(controlled component)이므로
 * checked와 onChange prop이 필수입니다.
 * 
 * Storybook에서 Toggle의 동작을 시연하기 위해
 * 내부 상태를 관리하는 래퍼 컴포넌트를 사용합니다.
 * 
 * 실제 사용 시에는 부모 컴포넌트에서 상태를 관리하거나
 * useToggle 같은 커스텀 훅을 사용할 수 있습니다.
 */
const StatefulToggle = (args: React.ComponentProps<typeof Toggle>) => {
  const [checked, setChecked] = useState(false);
  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={setChecked}
      ariaLabel="알림 토글"
    />
  );
};

export const Default: Story = {
  render: StatefulToggle,
};

export const Large: Story = {
  render: StatefulToggle,
  args: { size: 'lg' },
};

export const Disabled: Story = {
  render: StatefulToggle,
  args: { disabled: true },
};
