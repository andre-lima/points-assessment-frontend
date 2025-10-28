import { useSalary } from '../../hooks/store.hooks.ts';
import { Badge, Box, Card, Container, DataList, Flex, Grid, Separator, Heading } from '@radix-ui/themes';
import type { AmountPerBand } from '../../models/Brackets.ts';
import { useMemo } from 'react';
import { getTaxableAmountPerBracket } from '../../helpers/getTaxableAmountPerBracket.ts';
import { CaretRightIcon } from '@radix-ui/react-icons';
import { useBracketsForTaxationYear } from '../../hooks/api.hooks.ts';
import { TotalTaxes } from '../TotalTaxes';
import humanFormat from 'human-format';

export const ShowTaxInformation = () => {
  const { salary, brackets } = useSalary();
  const { isError, isLoading } = useBracketsForTaxationYear();

  const taxBands: AmountPerBand[] = useMemo(() => {
    if (!salary || !brackets) {
      return [];
    }

    return getTaxableAmountPerBracket(salary, brackets);
  }, [salary, brackets]);

  if (!isError && !isLoading && taxBands.length === 0) {
    return <Card>Waiting for user input...</Card>;
  }

  if (isLoading) {
    return <Card>Calculating...</Card>;
  }

  if (isError) {
    return null;
  }

  return (
    <Container>
      <TotalTaxes taxBands={taxBands} />
      <Heading mb="3" as="h4">
        Breakdown per bracket
      </Heading>
      <Grid columns="1fr" rows="1fr">
        {taxBands?.map((band, index) => (
          <Box pb="4">
            <Flex gap="1" align={'center'} mb="2">
              <Badge color="green">{humanFormat(brackets?.[index].min || 0)}$</Badge>
              {brackets?.[index].max && (
                <>
                  <CaretRightIcon />
                  <Badge color="red">{humanFormat(brackets?.[index].max)}$</Badge>
                </>
              )}
              {' : '}
              <Badge color="blue">{((brackets?.[index].rate || 0) * 100).toFixed(1)}%</Badge>
            </Flex>
            <DataList.Root>
              <DataList.Item align="center">
                <DataList.Label minWidth="50px">Taxable</DataList.Label>
                <DataList.Value>{humanFormat(band.amount_taxable)}$</DataList.Value>
              </DataList.Item>{' '}
              <DataList.Item align="center">
                <DataList.Label minWidth="50px">Payable</DataList.Label>
                <DataList.Value>{humanFormat(band.amount_payable)}$</DataList.Value>
              </DataList.Item>
            </DataList.Root>
            <Separator mt="2" orientation="horizontal" size="4" />
          </Box>
        ))}
      </Grid>
    </Container>
  );
};
