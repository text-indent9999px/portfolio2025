import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('checked 상태를 role="switch"의 aria-checked로 나타낸다', () => {
    render(<Toggle checked={false} onChange={vi.fn()} ariaLabel="다크 모드" />);
    expect(screen.getByRole('switch', { name: '다크 모드' })).toHaveAttribute(
      'aria-checked',
      'false'
    );
  });

  it('클릭하면 반대 값으로 onChange가 호출된다', async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} ariaLabel="다크 모드" />);
    await userEvent.click(screen.getByRole('switch', { name: '다크 모드' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('Enter/Space로도 전환된다', async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} ariaLabel="다크 모드" />);
    const toggle = screen.getByRole('switch', { name: '다크 모드' });
    toggle.focus();

    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(true);

    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('disabled면 클릭해도 onChange가 호출되지 않는다', async () => {
    const onChange = vi.fn();
    render(
      <Toggle
        checked={false}
        onChange={onChange}
        disabled
        ariaLabel="다크 모드"
      />
    );
    const toggle = screen.getByRole('switch', { name: '다크 모드' });
    expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('placeholder면 클릭해도 onChange가 호출되지 않는다', async () => {
    const onChange = vi.fn();
    render(
      <Toggle
        checked={false}
        onChange={onChange}
        placeholder
        ariaLabel="다크 모드"
      />
    );
    await userEvent.click(screen.getByRole('switch', { name: '다크 모드' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
