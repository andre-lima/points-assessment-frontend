import '@radix-ui/themes/styles.css';
import './index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme, Reset } from '@radix-ui/themes';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Reset>
      <Theme accentColor="indigo" appearance="light">
        <App />
      </Theme>
    </Reset>
  </StrictMode>,
);
