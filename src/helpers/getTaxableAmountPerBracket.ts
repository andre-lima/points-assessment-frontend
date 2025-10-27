import type { AmountPerBand, TaxBracket } from '../models/Brackets.ts';

/**
 * Calculates the taxable and payable amounts for a given salary based on a set of tax brackets.
 *
 * @param {number} salary - The total salary amount to calculate taxes for.
 * @param {TaxBracket[]} brackets - Tax brackets array.
 * @returns {AmountPerBand[]}
 *   An array of objects where each item represents the taxable and payable amount for its corresponding tax bracket.
 */
export const getTaxableAmountPerBracket = (salary: number, brackets: TaxBracket[]): AmountPerBand[] => {
  return brackets.reduce((acc, bracket) => {
    if (salary >= bracket.min) {
      const amount_taxable = Math.min(salary, bracket.max || Infinity) - bracket.min;
      const amount_payable = amount_taxable * bracket.rate;

      acc.push({ amount_taxable, amount_payable });
    }

    return acc;
  }, [] as AmountPerBand[]);
};
