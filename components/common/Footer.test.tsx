import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { expect, test } from 'vitest';

test('Footer 컴포넌트가 올바르게 렌더링됩니다', () => {
  render(<Footer />);
  const footerElement = screen.getByText(/Copyright 2025. sangil94s. All Rights Reserved./i);
  expect(footerElement).toBeInTheDocument();
});
