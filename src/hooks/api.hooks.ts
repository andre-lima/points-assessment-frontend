import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { SalaryContext } from '../store/SalaryContext.tsx';

async function fetchBracketsByYear(year: number) {
  const response = await fetch(`http://localhost:5001/tax-calculator/tax-year/${year}`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to fetch data');
  }
  return response.json();
}

export function useBracketsForTaxationYear() {
  const { year } = useContext(SalaryContext);

  console.log('useBracketsForTaxationYear', year);

  return useQuery({ queryKey: [`taxes-${year}`], queryFn: () => fetchBracketsByYear(year), retry: false });
}
