import App from './App';
import { render } from '@testing-library/react';

it('renders component', () => {
  const screen = render(<App />);
  expect(screen.getByText('Points Revenue Agency (PRA)')).toBeInTheDocument();
});
