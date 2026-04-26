import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import ColorChip from './ColorChip';

const meta: Meta<typeof ColorChip> = {
  title: 'UI/ColorChip',
  component: ColorChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ColorChip 컴포넌트는 raw palette 색상 칩을 시각적으로 표시합니다. semantic tone은 raw palette에 매핑된 별도 예시 스토리로 함께 제공합니다.',
      },
      controls: {
        expanded: true,
        sort: 'requiredFirst',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: [
        undefined,
        'brand',
        'subBrand',
        'success',
        'warning',
        'error',
        'info',
        'neutral',
      ],
      description:
        'semantic tone을 직접 지정합니다. 설정되면 colorType보다 우선합니다.',
      table: {
        type: { summary: 'Color' },
        category: '기본',
        description:
          'semantic tone을 직접 지정합니다. 설정되면 colorType보다 우선합니다.',
      },
    },
    colorType: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'gray'],
      description:
        'raw palette 타입을 선택합니다. semantic tone preview는 아래 별도 스토리에서 확인할 수 있습니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
        category: '기본',
        description:
          'raw palette 타입을 직접 지정합니다. tone이 없을 때 사용됩니다.',
      },
    },
    shade: {
      control: 'number',
      description: '색상의 shade 값을 지정합니다. 예: 50, 100, 200, ..., 900',
      table: {
        type: { summary: 'string | number' },
        category: '기본',
        description: '색상의 shade 값을 지정합니다. 예: 50, 100, 200, ..., 900',
      },
    },
    variant: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'ColorChip의 모양을 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'circle' },
        category: '스타일',
        description: 'ColorChip의 모양을 선택합니다.',
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'ColorChip의 크기를 선택합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
        category: '스타일',
        description: 'ColorChip의 크기를 선택합니다.',
      },
    },
  },
  args: {
    colorType: 'primary',
    shade: 500,
  },
};

export default meta;
type Story = StoryObj<typeof ColorChip>;

export const Default: Story = {};

export const SemanticTone: Story = {
  args: {
    tone: 'brand',
    colorType: undefined,
    shade: 500,
  },
};

const semanticToneMap = [
  { tone: 'brand', rawType: 'primary' },
  { tone: 'subBrand', rawType: 'secondary' },
  { tone: 'neutral', rawType: 'gray' },
  { tone: 'success', rawType: 'success' },
  { tone: 'warning', rawType: 'warning' },
  { tone: 'error', rawType: 'danger' },
  { tone: 'info', rawType: 'info' },
] as const;

export const SemanticTonePreview: Story = {
  parameters: {
    docs: {
      description: {
        story: '현재 semantic tone은 raw palette에 매핑되어 사용됩니다.',
      },
    },
  },
  render: args => (
    <div className="space-y-4">
      {semanticToneMap.map(item => (
        <div key={item.tone} className="space-y-2">
          <div className="text-sm font-medium">
            {item.tone} ({item.rawType})
          </div>
          <div className="flex items-center gap-2">
            {[100, 300, 500, 700, 900].map(shade => (
              <ColorChip key={`${item.tone}-${shade}`} {...args} tone={item.tone} shade={shade} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

