import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Nodata from './Nodata';
test('Nodata 컴포넌트가 올바르게 렌더링됩니다', () => {
  render(<Nodata />);
  const NodataElement = screen.getByText(/데이터가 없어요!/i);
  expect(NodataElement).toBeInTheDocument();
});
