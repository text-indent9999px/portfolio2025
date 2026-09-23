import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('슬롯은 header → thumb → body → footer 순서로 렌더된다', () => {
    const { container } = render(
      <Card
        slots={{
          header: <span>헤더</span>,
          thumb: <span>썸네일</span>,
          body: <span>본문</span>,
          footer: <span>푸터</span>,
        }}
      />
    );
    const order = [...container.querySelectorAll('span')].map(
      el => el.textContent
    );
    expect(order).toEqual(['헤더', '썸네일', '본문', '푸터']);
  });

  it('onClick이 없으면 상호작용 속성을 붙이지 않는다', () => {
    render(<Card slots={{ body: '내용' }} />);
    const card = screen.getByText('내용').closest('div[class]');
    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('tabindex');
  });

  it('onClick이 있으면 role="button"과 interactiveLabel을 접근 가능한 이름으로 쓴다', () => {
    render(
      <Card
        slots={{ body: '내용' }}
        onClick={vi.fn()}
        interactiveLabel="카드 열기"
      />
    );
    expect(screen.getByRole('button', { name: '카드 열기' })).toBeInTheDocument();
  });

  it('카드를 클릭하면 onClick이 호출된다', async () => {
    const onClick = vi.fn();
    render(
      <Card slots={{ body: '내용' }} onClick={onClick} interactiveLabel="열기" />
    );
    await userEvent.click(screen.getByRole('button', { name: '열기' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('카드 안의 버튼을 클릭하면 카드 자체의 onClick은 호출되지 않는다', async () => {
    const onClick = vi.fn();
    const onInnerClick = vi.fn();
    render(
      <Card
        slots={{
          body: (
            <button type="button" onClick={onInnerClick}>
              내부 버튼
            </button>
          ),
        }}
        onClick={onClick}
        interactiveLabel="열기"
      />
    );
    await userEvent.click(screen.getByRole('button', { name: '내부 버튼' }));
    expect(onInnerClick).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('포커스된 카드에서 Enter/Space를 누르면 onClick이 호출된다', async () => {
    const onClick = vi.fn();
    render(
      <Card slots={{ body: '내용' }} onClick={onClick} interactiveLabel="열기" />
    );
    const card = screen.getByRole('button', { name: '열기' });
    card.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);

    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });
});
