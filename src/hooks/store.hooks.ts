import { useContext } from 'react';
import { SalaryContext, SalaryDispatchContext } from '../store/SalaryContext.tsx';

export function useSalary() {
  return useContext(SalaryContext);
}

export function useSalaryDispatch() {
  return useContext(SalaryDispatchContext);
}
