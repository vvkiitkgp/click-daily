import { createContext, useState } from 'react';

export interface User {
  isLoggedIn: boolean;
}

export interface UserContextType {
  user: User;
  setUser: (u: User) => void;
}

export const defaultUserContext: UserContextType = {
  user: {
    isLoggedIn: false,
  },
  setUser: (u) => null,
};
export const UserContext = createContext<UserContextType>(defaultUserContext);
