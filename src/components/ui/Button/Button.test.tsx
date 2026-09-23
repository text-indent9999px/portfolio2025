import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('href가 없으면 <button>으로 렌더링한다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button', { name: '클릭' })).toBeInTheDocument();
  });

  it('내부 경로 href는 Next Link(<a>)로 렌더링한다', () => {
    render(<Button href="/projects/save-our-wallet">보기</Button>);
    const link = screen.getByRole('link', { name: '보기' });
    expect(link).toHaveAttribute('href', '/projects/save-our-wallet');
    expect(link).not.toHaveAttribute('target');
  });

  it('http(s) href는 새 탭으로 여는 외부 링크로 렌더링한다', () => {
    render(<Button href="https://github.com/text-indent9999px">GitHub</Button>);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('mailto: 같은 그 외 href는 target 없이 일반 링크로 렌더링한다', () => {
    render(<Button href="mailto:test@example.com">메일</Button>);
    const link = screen.getByRole('link', { name: '메일' });
    expect(link).not.toHaveAttribute('target');
  });

  it('disabled + href면 href를 떼어 이동을 막는다', () => {
    render(
      <Button href="/projects/save-our-wallet" disabled>
        보기
      </Button>
    );
    const link = screen.getByRole('link', { name: '보기' });
    expect(link).not.toHaveAttribute('href');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('버튼 클릭 시 onClick이 호출된다', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);
    await userEvent.click(screen.getByRole('button', { name: '클릭' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
