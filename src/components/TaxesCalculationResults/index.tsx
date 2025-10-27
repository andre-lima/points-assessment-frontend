import { useSalary } from '../../store/hooks.ts';
import { Flex } from '@radix-ui/themes';

export const TaxesCalculationResults = () => {
  const { year, salary } = useSalary();

  return (
    <Flex mt="4" p="4" gap="4" direction="column">
      {year} {salary}
    </Flex>
  );
};
