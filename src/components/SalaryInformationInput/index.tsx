import { useSalaryDispatch } from '../../store/hooks.ts';
import { Flex, Heading, TextField, Tooltip } from '@radix-ui/themes';
import type { ChangeEvent, MouseEvent } from 'react';
import type { SalaryData } from '../../models/SalaryData.ts';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { YearButton } from '../YearButton';

export const SalaryInformationInput = () => {
  const dispatch = useSalaryDispatch();

  const handleSalaryChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'set_salary', payload: +evt.target.value });
  };

  const handleSetYear = (evt: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (evt.target instanceof HTMLButtonElement && !!evt.target.dataset.year) {
      dispatch({ type: 'set_year', payload: +evt.target.dataset.year as SalaryData['year'] });
    }
  };

  return (
    <Flex mt="4" p="4" gap="4" direction="column">
      <Heading size="3">Enter your salary and taxation year below:</Heading>

      <TextField.Root type={'number'} onChange={handleSalaryChange} placeholder="Enter your salary here..." size="3">
        <TextField.Slot>$</TextField.Slot>
      </TextField.Root>

      <Flex gap="2" onClick={handleSetYear}>
        {[2019, 2020, 2021, 2022].map((year) => (
          <YearButton year={year} />
        ))}

        <Tooltip content="This year might not be available for calculations.">
          <YearButton color="amber" year={2023}>
            <InfoCircledIcon style={{ pointerEvents: 'none' }} />
          </YearButton>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
