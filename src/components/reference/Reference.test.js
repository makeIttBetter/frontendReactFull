import { render, screen } from '@testing-library/react';
import Reference from './reference';

test('renders learn react link', () => {
  render(<Reference />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
