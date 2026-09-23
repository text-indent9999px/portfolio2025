import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PrimaryTab } from './Tab';

const tabs = [
  { id: 'a', label: '탭 A' },
  { id: 'b', label: '탭 B' },
  { id: 'c', label: '탭 C' },
];

describe('PrimaryTab 키보드 내비게이션', () => {
  it('오른쪽 화살표는 다음 탭을 선택하고 포커스를 옮긴다', async () => {
    const onTabChange = vi.fn();
    render(
      <PrimaryTab
        tabs={tabs}
        activeTab="a"
        onTabChange={onTabChange}
        uniqueId="test"
      />
    );

    screen.getByRole('tab', { name: '탭 A' }).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(onTabChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('tab', { name: '탭 B' })).toHaveFocus();
  });

  it('마지막 탭에서 오른쪽 화살표를 누르면 처음 탭으로 순환한다', async () => {
    const onTabChange = vi.fn();
    render(
      <PrimaryTab
        tabs={tabs}
        activeTab="c"
        onTabChange={onTabChange}
        uniqueId="test"
      />
    );

    screen.getByRole('tab', { name: '탭 C' }).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(onTabChange).toHaveBeenCalledWith('a');
  });

  it('End 키는 마지막 탭으로 이동한다', async () => {
    const onTabChange = vi.fn();
    render(
      <PrimaryTab
        tabs={tabs}
        activeTab="a"
        onTabChange={onTabChange}
        uniqueId="test"
      />
    );

    screen.getByRole('tab', { name: '탭 A' }).focus();
    await userEvent.keyboard('{End}');

    expect(onTabChange).toHaveBeenCalledWith('c');
  });

  it('활성 탭만 tabIndex 0을 갖는다(Roving tabindex)', () => {
    render(
      <PrimaryTab
        tabs={tabs}
        activeTab="b"
        onTabChange={vi.fn()}
        uniqueId="test"
      />
    );

    expect(screen.getByRole('tab', { name: '탭 A' })).toHaveAttribute(
      'tabindex',
      '-1'
    );
    expect(screen.getByRole('tab', { name: '탭 B' })).toHaveAttribute(
      'tabindex',
      '0'
    );
  });
});
