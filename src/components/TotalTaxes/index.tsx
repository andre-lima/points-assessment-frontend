import { useSalary } from '../../hooks/store.hooks.ts';
import { Badge, Flex, Heading } from '@radix-ui/themes';
import humanFormat from 'human-format';

import type { AmountPerBand } from '../../models/Brackets.ts';

export const TotalTaxes = ({ taxBands }: { taxBands: AmountPerBand[] }) => {
  const { salary } = useSalary();

  const totalPayable = taxBands.reduce((accumulation, currentValue) => currentValue.amount_payable + accumulation, 0);

  if (!salary) {
    return null;
  }

  return (
    <Flex my="4" gap="4" direction="column">
      <Heading as="h4">Total Taxes</Heading>
      <div>
        <Badge>Salary:</Badge> {humanFormat(salary)}$
      </div>
      <div>
        <Badge>Total Payable:</Badge> {humanFormat(totalPayable)}$
      </div>
      <div>
        <Badge>Effective Rate:</Badge> {humanFormat((100 * totalPayable) / salary)}%
      </div>
    </Flex>
  );
};
