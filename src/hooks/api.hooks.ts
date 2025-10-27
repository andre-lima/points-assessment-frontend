import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { SalaryContext } from '../store/SalaryContext.tsx';
import axios from 'axios';

export function useBracketsForTaxationYear() {
  const { year } = useContext(SalaryContext);

  return useQuery({
    queryKey: ['year', year],
    queryFn: async () => {
      if (!year) {
        return [];
      }
      const response = await axios.get(`http://localhost:5001/tax-calculator/tax-year/${year}`);

      return response.data;
    },
    retry: false,
  });
}
