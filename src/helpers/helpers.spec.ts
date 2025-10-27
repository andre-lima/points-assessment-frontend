import { getTaxableAmountPerBracket } from './getTaxableAmountPerBracket.ts';
import { API_RESPONSE } from '../mocks/mockData.ts';

describe('Taxable Amount Per Bracket', () => {
  it('should give a taxable amount of 0$ and payable amount of 0$ for a salary of 0$', () => {
    const amountPerBand = getTaxableAmountPerBracket(0, API_RESPONSE.tax_brackets);

    // expect(amountPerBand).toHaveLength(1);
    expect(amountPerBand).toEqual([{ amount_taxable: 0, amount_payable: 0 }]);
  });

  it('should give a taxable amount of 10000$ and payable amount of 0$ for a salary of 10000', () => {
    const amountPerBand = getTaxableAmountPerBracket(10000, API_RESPONSE.tax_brackets);

    // expect(amountPerBand).toHaveLength(1);
    expect(amountPerBand).toEqual([{ amount_taxable: 10000, amount_payable: 0 }]);
  });

  it('should correct tax bands for a salary of 30000$', () => {
    const amountPerBand = getTaxableAmountPerBracket(30000, API_RESPONSE.tax_brackets);

    // expect(amountPerBand).toHaveLength(1);
    expect(amountPerBand).toEqual([
      { amount_taxable: 20000, amount_payable: 0 },
      { amount_taxable: 10000, amount_payable: 1000 },
    ]);
  });

  it('should correct tax bands for a salary of 100000$', () => {
    const amountPerBand = getTaxableAmountPerBracket(100000, API_RESPONSE.tax_brackets);

    // expect(amountPerBand).toHaveLength(1);
    expect(amountPerBand).toEqual([
      { amount_taxable: 20000, amount_payable: 0 },
      { amount_taxable: 20000, amount_payable: 2000 },
      { amount_taxable: 20000, amount_payable: 4000 },
      { amount_taxable: 20000, amount_payable: 6000 },
      { amount_taxable: 20000, amount_payable: 8000 },
      { amount_taxable: 0, amount_payable: 0 },
    ]);
  });

  it('should correct tax bands for a salary of 150000$', () => {
    const amountPerBand = getTaxableAmountPerBracket(150000, API_RESPONSE.tax_brackets);

    // expect(amountPerBand).toHaveLength(1);
    expect(amountPerBand).toEqual([
      { amount_taxable: 20000, amount_payable: 0 },
      { amount_taxable: 20000, amount_payable: 2000 },
      { amount_taxable: 20000, amount_payable: 4000 },
      { amount_taxable: 20000, amount_payable: 6000 },
      { amount_taxable: 20000, amount_payable: 8000 },
      { amount_taxable: 50000, amount_payable: 25000 },
    ]);
  });
});
