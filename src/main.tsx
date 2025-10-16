import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { LocalizedHome } from './components/features/LocalizedHome';
import './app/globals.css';

const lang = 'se';
i18n.changeLanguage(lang);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <LocalizedHome lang={lang} />
    </I18nextProvider>
  </React.StrictMode>
);
