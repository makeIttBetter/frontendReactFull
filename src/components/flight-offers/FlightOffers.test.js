import { render, screen } from '@testing-library/react';
import Reference from './FlightOffers';

test('renders learn react link', () => {
  render(<Reference />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
