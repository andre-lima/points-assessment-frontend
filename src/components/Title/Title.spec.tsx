import { render } from '@testing-library/react';
import { Title } from './index.tsx';

describe('App Title', () => {
  it('should render', () => {
    const screen = render(<Title />);
    expect(screen.getByText('Points Revenue Agency (PRA)')).toBeInTheDocument();
  });
});
