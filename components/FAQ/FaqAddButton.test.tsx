import { render, screen, fireEvent } from '@testing-library/react';
import FaqAddButton from './FaqAddButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { expect, test, vi, Mock } from 'vitest';
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

test('관리자일 때 FaqAddButton 컴포넌트가 올바르게 렌더링되고 클릭 시 라우터가 작동합니다', () => {
  (useSession as unknown as Mock).mockReturnValue({
    data: { user: { name: process.env.NEXT_PUBLIC_ADMIN_AUDIT } },
  });

  const pushMock = vi.fn();
  (useRouter as unknown as Mock).mockReturnValue({ push: pushMock });

  render(<FaqAddButton />);

  const button = screen.getByText('관리자 전용 - 추가');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(pushMock).toHaveBeenCalledWith('/faq/add');
});

test('비관리자일 때 FaqAddButton 컴포넌트는 렌더링되지 않습니다', () => {
  (useSession as unknown as Mock).mockReturnValue({
    data: { user: { name: '비 관리자 사용자' } },
  });

  render(<FaqAddButton />);

  const button = screen.queryByText('관리자 전용 - 추가');
  expect(button).toBeNull();
});
