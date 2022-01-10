import React from 'react';
import {render, screen} from '@testing-library/react';
import MovieList from './MovieList';

test('renders learn react link', () => {
  render(<MovieList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
