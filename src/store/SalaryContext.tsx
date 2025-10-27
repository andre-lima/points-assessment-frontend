import { createContext, type Dispatch, type ReactNode, useReducer } from 'react';
import type { SalaryData } from '../models/SalaryData.ts';
import type { ApiResponse } from '../models/Brackets.ts';

// eslint-disable-next-line react-refresh/only-export-components
export const SalaryContext = createContext<SalaryData>({ year: null, salary: null, brackets: null });

// eslint-disable-next-line react-refresh/only-export-components
export const SalaryDispatchContext = createContext<Dispatch<Action>>(() => {});

type Action =
  | { type: 'set_year'; payload: SalaryData['year'] }
  | { type: 'set_salary'; payload: SalaryData['salary'] }
  | { type: 'set_brackets'; payload: ApiResponse['tax_brackets'] | null };

export function SalaryProvider({ children }: { children: ReactNode }) {
  const [salaryData, dispatch] = useReducer(salaryDataReducer, {
    year: null,
    salary: null,
    brackets: null,
  });

  return (
    <SalaryContext value={salaryData}>
      <SalaryDispatchContext value={dispatch}>{children}</SalaryDispatchContext>
    </SalaryContext>
  );
}

function salaryDataReducer(salaryData: SalaryData, action: Action): SalaryData {
  switch (action.type) {
    case 'set_year': {
      return { ...salaryData, year: action.payload };
    }
    case 'set_salary': {
      return { ...salaryData, salary: action.payload };
    }
    case 'set_brackets': {
      return { ...salaryData, brackets: action.payload };
    }
    default: {
      console.error('Unknown action');
      return salaryData;
    }
  }
}
