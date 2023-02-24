
import {
  createContext,
  useContext
} from 'react';

import { getTokenLocalStorage } from '../../services/global/endPoints';

import { AuthContextProps, AuthContextProviderType, LoginProps } from './interface';

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderType) {

  // const isAuthentication = !!getTokenLocalStorage();// HABILITAR QUANDO FOR INTEGRAR API
  const isAuthentication = true; //REMOVER QUANDO FOR INTEGRAR API


  const login = (credentials: LoginProps) => {
    // CHAMADA DE API DE LOGIN AQUI
  };

  return (
    <AuthContext.Provider
      value={{
        login: (credentials: LoginProps) => login(credentials),

        isAuthentication
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};