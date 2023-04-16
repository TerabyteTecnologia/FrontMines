
import {
  createContext,
  useContext,
  useState
} from 'react';
import { HttpAuth } from '../../config/http';
import { useNavigate } from "react-router-dom";

import { getTokenLocalStorage, getUserLocalStorage } from '../../services/global/endPoints';

import { AuthContextProps, AuthContextProviderType, LoginProps,RecoveryProps } from './interface';

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderType) {

   const isAuthentication = !!getTokenLocalStorage();// HABILITAR QUANDO FOR INTEGRAR API
   const user = getUserLocalStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [tentativas,setTentativas] =useState<number>(0);

  const login = (credentials: LoginProps) => {
    setLoading(true);
    // CHAMADA DE API DE LOGIN AQUI
    HttpAuth.post('/usuario/authenticate',credentials).then(res =>{
  
      if(res.data.situacao == true){
        localStorage.setItem('@TerabyteTecnologia-:token-1.0.0',res.data.access_token);
        localStorage.setItem('@TerabyteTecnologia-:user',res.data.data.nome)
        setTentativas(0);
        navigate("/");  //REMOVER ESTE NAVIGATE APÓS INTEGRAR COM API
      }else{
        setTentativas(tentativas+1);
        alert(res.data.error)
      }
      setLoading(false);
    })
    
  };

  const recovery = (credentials: RecoveryProps) => {
    setLoading(true);
    // CHAMADA DE API DE LOGIN AQUI
    HttpAuth.post('/usuario/recovery',credentials).then(res =>{
    
      if(res.data.situacao == true){
        setTentativas(0);
        navigate("/login");  
      }else{
      
        setTentativas(tentativas+1);
        alert(res.data.msg)
      }
      setLoading(false)
    })
    
  };
 
 
  const logout =()=>{
     localStorage.clear();
     navigate("/login");
  }
  

   function verificaUsoUnico(){
    try{
          let token = localStorage.getItem('@TerabyteTecnologia-:token-1.0.0');
          HttpAuth.put('/usuario/usounico',{
                token: token
              }).then(resaxios =>{
                if(resaxios){
                  if(resaxios.data.codigo == 1){
                    console.log('logout')
                 
                    logout();
                  
                  }
                }
              }).catch(error=>{            
                console.log('logout')
                logout();
              
              })
      
        
    }catch{
      
      console.log('logout')
      
      logout();
      
    }
  }
  return (
    <AuthContext.Provider
      value={{
        login: (credentials: LoginProps) => login(credentials),
        recovery: (credentials: RecoveryProps) => recovery(credentials),
        logout,
        verificaUsoUnico,
        setTentativas,
        tentativas,
        isAuthentication,
        loading,
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