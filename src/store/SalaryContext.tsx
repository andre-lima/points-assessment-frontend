import { createContext, type Dispatch, type ReactNode, useReducer } from 'react';
import type { SalaryData } from '../models/SalaryData.ts';

// eslint-disable-next-line react-refresh/only-export-components
export const SalaryContext = createContext<SalaryData>({ year: 2019, salary: null });

// eslint-disable-next-line react-refresh/only-export-components
export const SalaryDispatchContext = createContext<Dispatch<Action>>(() => {});

type Action = { type: 'set_year'; payload: SalaryData['year'] } | { type: 'set_salary'; payload: SalaryData['salary'] };

export function SalaryProvider({ children }: { children: ReactNode }) {
  const [salaryData, dispatch] = useReducer(salaryDataReducer, {
    year: 2019,
    salary: null,
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
    default: {
      console.error('Unknown action');
      return salaryData;
    }
  }
}
