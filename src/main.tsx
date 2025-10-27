import '@radix-ui/themes/styles.css';
import './index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Reset } from '@radix-ui/themes';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Reset>
      <App />
    </Reset>
  </StrictMode>,
);
