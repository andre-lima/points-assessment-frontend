import { useSalary, useSalaryDispatch } from '../../hooks/store.hooks.ts';
import { Flex, Spinner } from '@radix-ui/themes';
import { useBracketsForTaxationYear } from '../../hooks/api.hooks.ts';
import { useEffect } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import type { AxiosError } from 'axios';

export const TaxesCalculationResults = () => {
  const { year, salary, brackets } = useSalary();
  const { data, error, isLoading, isSuccess, isError, refetch } = useBracketsForTaxationYear();
  const dispatch = useSalaryDispatch();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch({ type: 'set_brackets', payload: data.tax_brackets });
    }
  }, [isSuccess, dispatch, data]);

  useEffect(() => {
    if (isError) {
      dispatch({ type: 'set_brackets', payload: [] });
    }
  }, [isError, dispatch]);

  return (
    <Flex mt="4" p="4" gap="4" direction="column">
      {year} {salary} {JSON.stringify(brackets)}
      <Spinner loading={isLoading} />
      {error && <ErrorMessage error={error as AxiosError} onRetry={refetch}></ErrorMessage>}
    </Flex>
  );
};
