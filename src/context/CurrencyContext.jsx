import React, { createContext, useContext, useState } from 'react';

const CURRENCIES = {
  GBP: { code: 'GBP', symbol: '£', rate: 1.0, label: 'United Kingdom (GBP £)' },
  USD: { code: 'USD', symbol: '$', rate: 1.28, label: 'United States (USD $)' },
  EUR: { code: 'EUR', symbol: '€', rate: 1.18, label: 'European Union (EUR €)' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.95, label: 'Australia (AUD $)' }
};

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('GBP');

  const formatPrice = (amountGBP) => {
    const curr = CURRENCIES[currency] || CURRENCIES.GBP;
    const converted = amountGBP * curr.rate;
    return `${curr.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        currencyData: CURRENCIES[currency],
        allCurrencies: CURRENCIES
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
}
