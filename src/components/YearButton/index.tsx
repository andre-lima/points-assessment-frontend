import { Button, type ButtonProps } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import { useSalary } from '../../store/hooks.ts';

export const YearButton = ({ children, year, ...rest }: { children?: ReactNode; year: number } & ButtonProps) => {
  const { year: selectedYear } = useSalary();

  return (
    <Button {...rest} variant={selectedYear === year ? 'solid' : 'outline'} data-year={year}>
      {children}
      {year}
    </Button>
  );
};
