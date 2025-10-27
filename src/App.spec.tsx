import App from './App';
import { render, screen } from '@testing-library/react';

it('renders component', () => {
  render(<App />);
  expect(screen.getByText('starting')).toBeInTheDocument();
});
