import { useSalary, useSalaryDispatch } from '../../hooks/store.hooks.ts';
import { Flex, Heading, Spinner } from '@radix-ui/themes';
import { useBracketsForTaxationYear } from '../../hooks/api.hooks.ts';
import { useEffect } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import type { AxiosError } from 'axios';
import { ShowTaxInformation } from '../ShowTaxInformation';

export const TaxesCalculationResults = () => {
  const { year } = useSalary();
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
      <Heading>Taxation Calculation Results for {year || '...'}</Heading>
      <Spinner loading={isLoading} />
      {error && <ErrorMessage error={error as AxiosError} onRetry={refetch}></ErrorMessage>}
      <ShowTaxInformation />
    </Flex>
  );
};
