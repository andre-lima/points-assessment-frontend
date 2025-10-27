import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, renderHook } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useContext } from 'react';
import { SalaryProvider, SalaryContext, SalaryDispatchContext } from './SalaryContext';

// Custom hook to access both context values
const useSalaryContext = () => ({
  salaryData: useContext(SalaryContext),
  dispatch: useContext(SalaryDispatchContext),
});

describe('SalaryContext', () => {
  describe('SalaryProvider', () => {
    it('provides initial salary data with year 2019 and null salary', () => {
      const TestComponent = () => {
        const { salaryData } = useSalaryContext();
        return (
          <div>
            <span data-testid="year">{salaryData.year}</span>
            <span data-testid="salary">{salaryData.salary ?? 'null'}</span>
          </div>
        );
      };

      render(
        <SalaryProvider>
          <TestComponent />
        </SalaryProvider>,
      );

      expect(screen.getByTestId('year')).toHaveTextContent('2019');
      expect(screen.getByTestId('salary')).toHaveTextContent('null');
    });

    it('provides dispatch function through SalaryDispatchContext', () => {
      const { result } = renderHook(useSalaryContext, { wrapper: SalaryProvider });
      expect(result.current.dispatch).toBeTruthy();
    });

    it('renders children correctly', () => {
      render(
        <SalaryProvider>
          <div data-testid="child">Child Content</div>
        </SalaryProvider>,
      );

      expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });
  });

  describe('salaryDataReducer via dispatch', () => {
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      // @ts-expect-error Not important
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    it('handles set_year action', async () => {
      const TestComponent = () => {
        const { salaryData, dispatch } = useSalaryContext();
        return (
          <div>
            <div data-testid="year">{salaryData.year}</div>
            <div data-testid="salary">{salaryData.salary ?? 'null'}</div>
            <button onClick={() => dispatch?.({ type: 'set_year', payload: 2020 })}>Set Year</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(
        <SalaryProvider>
          <TestComponent />
        </SalaryProvider>,
      );

      expect(screen.getByTestId('year')).toHaveTextContent('2019');

      await user.click(screen.getByText('Set Year'));

      expect(screen.getByTestId('year')).toHaveTextContent('2020');
      expect(screen.getByTestId('salary')).toHaveTextContent('null');
    });

    it('handles set_salary action', async () => {
      const TestComponent = () => {
        const { salaryData, dispatch } = useSalaryContext();
        return (
          <div>
            <div data-testid="salary">{salaryData.salary ?? 'null'}</div>
            <div data-testid="year">{salaryData.year}</div>
            <button onClick={() => dispatch?.({ type: 'set_salary', payload: 75000 })}>Set Salary</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(
        <SalaryProvider>
          <TestComponent />
        </SalaryProvider>,
      );

      expect(screen.getByTestId('salary')).toHaveTextContent('null');

      await user.click(screen.getByText('Set Salary'));

      expect(screen.getByTestId('salary')).toHaveTextContent('75000');
      expect(screen.getByTestId('year')).toHaveTextContent('2019');
    });

    it('handles multiple actions in sequence', async () => {
      const TestComponent = () => {
        const { salaryData, dispatch } = useSalaryContext();
        return (
          <div>
            <div data-testid="year">{salaryData.year}</div>
            <div data-testid="salary">{salaryData.salary ?? 'null'}</div>
            <button onClick={() => dispatch?.({ type: 'set_year', payload: 2020 })}>Set Year 2020</button>
            <button onClick={() => dispatch?.({ type: 'set_salary', payload: 90000 })}>Set Salary 90000</button>
            <button onClick={() => dispatch?.({ type: 'set_year', payload: 2021 })}>Set Year 2021</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(
        <SalaryProvider>
          <TestComponent />
        </SalaryProvider>,
      );

      await user.click(screen.getByText('Set Year 2020'));
      expect(screen.getByTestId('year')).toHaveTextContent('2020');
      expect(screen.getByTestId('salary')).toHaveTextContent('null');

      await user.click(screen.getByText('Set Salary 90000'));
      expect(screen.getByTestId('year')).toHaveTextContent('2020');
      expect(screen.getByTestId('salary')).toHaveTextContent('90000');

      await user.click(screen.getByText('Set Year 2021'));
      expect(screen.getByTestId('year')).toHaveTextContent('2021');
      expect(screen.getByTestId('salary')).toHaveTextContent('90000');
    });

    it('preserves existing state when updating', async () => {
      const TestComponent = () => {
        const { salaryData, dispatch } = useSalaryContext();
        return (
          <div>
            <div data-testid="year">{salaryData.year}</div>
            <div data-testid="salary">{salaryData.salary ?? 'null'}</div>
            <button onClick={() => dispatch?.({ type: 'set_salary', payload: 50000 })}>Set Salary</button>
            <button onClick={() => dispatch?.({ type: 'set_year', payload: 2022 })}>Set Year</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(
        <SalaryProvider>
          <TestComponent />
        </SalaryProvider>,
      );

      await user.click(screen.getByText('Set Salary'));
      await user.click(screen.getByText('Set Year'));

      expect(screen.getByTestId('year')).toHaveTextContent('2022');
      expect(screen.getByTestId('salary')).toHaveTextContent('50000');
    });

    it('handles setting salary to null', async () => {
      const TestComponent = () => {
        const { salaryData, dispatch } = useSalaryContext();
        return (
          <div>
            <div data-testid="salary">{salaryData.salary ?? 'null'}</div>
            <button onClick={() => dispatch?.({ type: 'set_salary', payload: 80000 })}>Set Salary 80000</button>
            <button onClick={() => dispatch?.({ type: 'set_salary', payload: null })}>Clear Salary</button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(
        <SalaryProvider>
          <TestComponent />
        </SalaryProvider>,
      );

      await user.click(screen.getByText('Set Salary 80000'));
      expect(screen.getByTestId('salary')).toHaveTextContent('80000');

      await user.click(screen.getByText('Clear Salary'));
      expect(screen.getByTestId('salary')).toHaveTextContent('null');
    });

    it('logs error and returns unchanged state for unknown action', async () => {
      const TestComponent = () => {
        const { salaryData, dispatch } = useSalaryContext();
        return (
          <div>
            <div data-testid="year">{salaryData.year}</div>
            <div data-testid="salary">{salaryData.salary ?? 'null'}</div>
            <button onClick={() => dispatch?.({ type: 'unknown_action', payload: 'test' } as never)}>
              Unknown Action
            </button>
          </div>
        );
      };

      const user = userEvent.setup();
      render(
        <SalaryProvider>
          <TestComponent />
        </SalaryProvider>,
      );

      const initialYear = screen.getByTestId('year').textContent;
      const initialSalary = screen.getByTestId('salary').textContent;

      await user.click(screen.getByText('Unknown Action'));

      expect(consoleErrorSpy).toHaveBeenCalledWith('Unknown action');
      expect(screen.getByTestId('year')).toHaveTextContent(initialYear!);
      expect(screen.getByTestId('salary')).toHaveTextContent(initialSalary!);
    });
  });

  describe('Context integration', () => {
    it('multiple components can access the same context value', () => {
      const Component1 = () => {
        const { salaryData } = useSalaryContext();
        return <div data-testid="comp1-year">{salaryData.year}</div>;
      };

      const Component2 = () => {
        const { salaryData } = useSalaryContext();
        return <div data-testid="comp2-year">{salaryData.year}</div>;
      };

      render(
        <SalaryProvider>
          <Component1 />
          <Component2 />
        </SalaryProvider>,
      );

      expect(screen.getByTestId('comp1-year')).toHaveTextContent('2019');
      expect(screen.getByTestId('comp2-year')).toHaveTextContent('2019');
    });

    it('updates are reflected in all consuming components', async () => {
      const Component1 = () => {
        const { salaryData, dispatch } = useSalaryContext();
        return (
          <div>
            <div data-testid="comp1-year">{salaryData.year}</div>
            <button onClick={() => dispatch?.({ type: 'set_year', payload: 2021 })}>Update</button>
          </div>
        );
      };

      const Component2 = () => {
        const { salaryData } = useSalaryContext();
        return <div data-testid="comp2-year">{salaryData.year}</div>;
      };

      const user = userEvent.setup();
      render(
        <SalaryProvider>
          <Component1 />
          <Component2 />
        </SalaryProvider>,
      );

      await user.click(screen.getByText('Update'));

      expect(screen.getByTestId('comp1-year')).toHaveTextContent('2021');
      expect(screen.getByTestId('comp2-year')).toHaveTextContent('2021');
    });
  });
});
