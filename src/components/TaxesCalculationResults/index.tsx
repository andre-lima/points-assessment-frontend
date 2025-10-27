import { useSalary } from '../../hooks/store.hooks.ts';
import { Flex } from '@radix-ui/themes';
import { useBracketsForTaxationYear } from '../../hooks/api.hooks.ts';

export const TaxesCalculationResults = () => {
  const { year, salary } = useSalary();
  const { data, error } = useBracketsForTaxationYear();

  return (
    <Flex mt="4" p="4" gap="4" direction="column">
      {year} {salary}
      {JSON.stringify(data)}
      {JSON.stringify(error)}
    </Flex>
  );
};
