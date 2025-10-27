import type { ApiResponse } from '../models/Brackets.ts';

export const API_RESPONSE: ApiResponse = {
  tax_brackets: [
    { min: 0, max: 20000, rate: 0 },
    { min: 20000, max: 40000, rate: 0.1 },
    { min: 40000, max: 60000, rate: 0.2 },
    { min: 60000, max: 80000, rate: 0.3 },
    { min: 80000, max: 100000, rate: 0.4 },
    { min: 100000, rate: 0.5 },
  ],
};
