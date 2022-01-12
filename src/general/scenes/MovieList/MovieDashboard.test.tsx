import React from 'react';
import {render, screen} from '@testing-library/react';
import MovieDashboard from './MovieDashboard';

test('renders learn react link', () => {
  render(<MovieDashboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
