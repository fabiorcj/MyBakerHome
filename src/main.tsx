import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './app';
import { Toaster } from 'sonner';
import '../src/lib/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster richColors />
  </React.StrictMode>,
);
