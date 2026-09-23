import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SecondaryTab } from './Tab';

const tabs = [
  { id: 'a', label: '탭 A' },
  { id: 'b', label: '탭 B' },
  { id: 'c', label: '탭 C' },
];

describe('SecondaryTab', () => {
  it('탭을 클릭하면 onTabChange가 그 탭 id로 호출된다', async () => {
    const onTabChange = vi.fn();
    render(
      <SecondaryTab
        tabs={tabs}
        activeTab="a"
        onTabChange={onTabChange}
        uniqueId="test"
      />
    );

    await userEvent.click(screen.getByRole('tab', { name: /탭 B/ }));
    expect(onTabChange).toHaveBeenCalledWith('b');
  });

  it('활성 탭만 tabIndex 0을 갖는다(Roving tabindex)', () => {
    render(
      <SecondaryTab
        tabs={tabs}
        activeTab="b"
        onTabChange={vi.fn()}
        uniqueId="test"
      />
    );

    expect(screen.getByRole('tab', { name: /탭 A/ })).toHaveAttribute(
      'tabindex',
      '-1'
    );
    expect(screen.getByRole('tab', { name: /탭 B/ })).toHaveAttribute(
      'tabindex',
      '0'
    );
  });

  it('오른쪽 화살표는 다음 탭으로 옮기고 포커스도 따라간다', async () => {
    const onTabChange = vi.fn();
    render(
      <SecondaryTab
        tabs={tabs}
        activeTab="a"
        onTabChange={onTabChange}
        uniqueId="test"
      />
    );

    screen.getByRole('tab', { name: /탭 A/ }).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(onTabChange).toHaveBeenCalledWith('b');
    // 포커스 이동은 다음 렌더 이후 setTimeout으로 일어난다.
    await waitFor(
      () => expect(screen.getByRole('tab', { name: /탭 B/ })).toHaveFocus(),
      { timeout: 500 }
    );
  });

  it('마지막 탭에서 오른쪽 화살표를 누르면 첫 탭으로 순환한다', async () => {
    const onTabChange = vi.fn();
    render(
      <SecondaryTab
        tabs={tabs}
        activeTab="c"
        onTabChange={onTabChange}
        uniqueId="test"
      />
    );

    screen.getByRole('tab', { name: /탭 C/ }).focus();
    await userEvent.keyboard('{ArrowRight}');

    expect(onTabChange).toHaveBeenCalledWith('a');
  });

  it('첫 탭에서 왼쪽 화살표를 누르면 마지막 탭으로 순환한다', async () => {
    const onTabChange = vi.fn();
    render(
      <SecondaryTab
        tabs={tabs}
        activeTab="a"
        onTabChange={onTabChange}
        uniqueId="test"
      />
    );

    screen.getByRole('tab', { name: /탭 A/ }).focus();
    await userEvent.keyboard('{ArrowLeft}');

    expect(onTabChange).toHaveBeenCalledWith('c');
  });

  it('End 키는 마지막 탭으로 이동한다', async () => {
    const onTabChange = vi.fn();
    render(
      <SecondaryTab
        tabs={tabs}
        activeTab="a"
        onTabChange={onTabChange}
        uniqueId="test"
      />
    );

    screen.getByRole('tab', { name: /탭 A/ }).focus();
    await userEvent.keyboard('{End}');

    expect(onTabChange).toHaveBeenCalledWith('c');
  });
});
