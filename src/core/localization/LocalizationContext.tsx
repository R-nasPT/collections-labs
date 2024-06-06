import React, { createContext, useContext, useState } from 'react';

type LocalizationContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LocalizationContext = createContext<LocalizationContextType>({
  locale: 'en',
  setLocale: () => {},
});

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState('en');

  return (
    <LocalizationContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  return useContext(LocalizationContext);
};
