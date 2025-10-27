export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

export type ApiResponse = { tax_brackets: TaxBracket[] };

export type AmountPerBand = {
  amount_taxable: number;
  amount_payable: number;
};
