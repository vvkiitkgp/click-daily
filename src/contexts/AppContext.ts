import { createContext } from 'react';

export interface AppContextType {
  theme: 'light' | 'dark';
  setTheme: (u: 'light' | 'dark') => void;
}

export const defaultAppContext: AppContextType = {
    theme: 'light',
    setTheme: ([]) => null,
};

export const AppContext = createContext<AppContextType>(defaultAppContext);
