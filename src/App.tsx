import { Flex, Grid } from '@radix-ui/themes';
import './App.scss';
import { Title } from './components/Title';
import { SalaryInformationInput } from './components/SalaryInformationInput';
import { SalaryProvider } from './store/SalaryContext.tsx';
import { TaxesCalculationResults } from './components/TaxesCalculationResults';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SalaryProvider>
        <Flex p="2" direction={'column'}>
          <Title />
          <Grid columns="1fr 2fr" gap="4" width="auto">
            <SalaryInformationInput />
            <TaxesCalculationResults />
          </Grid>
        </Flex>
      </SalaryProvider>
    </QueryClientProvider>
  );
}

export default App;
