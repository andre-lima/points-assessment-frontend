import { Flex, Grid } from '@radix-ui/themes';
import './App.scss';
import { Title } from './components/Title';
import { SalaryInformationInput } from './components/SalaryInformationInput';
import { SalaryProvider } from './store/SalaryContext.tsx';
import { TaxesCalculationResults } from './components/TaxesCalculationResults';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Theme accentColor="indigo" appearance={isDark ? 'dark' : 'light'}>
        <SalaryProvider>
          <Flex p="2" direction={'column'}>
            <Flex direction={'column'} gap="2">
              <Title />
              <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
            </Flex>
            <Grid columns="1fr 2fr" gap="4" width="auto">
              <SalaryInformationInput />
              <TaxesCalculationResults />
            </Grid>
          </Flex>
        </SalaryProvider>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
