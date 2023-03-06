
import {
  createContext,
  useContext
} from 'react';
import { HttpAuth } from '../../config/http';
import { useNavigate } from "react-router-dom";

import { getTokenLocalStorage, getUserLocalStorage } from '../../services/global/endPoints';

import { AuthContextProps, AuthContextProviderType, LoginProps } from './interface';

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderType) {

   const isAuthentication = !!getTokenLocalStorage();// HABILITAR QUANDO FOR INTEGRAR API
   const user = getUserLocalStorage();
  const navigate = useNavigate();

  const login = (credentials: LoginProps) => {
    // CHAMADA DE API DE LOGIN AQUI
    HttpAuth.post('/usuario/authenticate',credentials).then(res =>{
      if(res.data.situacao == true){
        localStorage.setItem('@TerabyteTecnologia-:token-1.0.0',res.data.access_token);
        localStorage.setItem('@TerabyteTecnologia-:user',res.data.data.nome)
        navigate("/");  //REMOVER ESTE NAVIGATE APÓS INTEGRAR COM API
      }else{
        alert(res.data.error)
      }
    })
    
  };
 
  const logout =()=>{
     localStorage.clear();
     navigate("/login");
  }
  return (
    <AuthContext.Provider
      value={{
        login: (credentials: LoginProps) => login(credentials),
        logout,
        isAuthentication,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};