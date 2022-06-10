import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('画面', () => {
  render(<App />);
  const linkElement = screen.getByText(/LOADING/i);
  expect(linkElement).toBeInTheDocument();
});
