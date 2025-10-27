import type { ApiResponse } from './Brackets.ts';

export type SalaryData = {
  year: 2019 | 2020 | 2021 | 2022;
  salary: number | null;
  brackets: ApiResponse['tax_brackets'] | null;
};
