import { useNavigate } from "react-router-dom";

import logoLogin from '../../assets/images/logo_login.png';
import userIcon from '../../assets/icons/person.svg';
import passwordIcon from '../../assets/icons/password.svg';

import { Input } from "../../components/Input";
import { ButtonDefault } from "../../components/Button";

import { useAuth } from "../../contexts/Auth";

import { LoginContainer, LoginContent, LoginForm, LoginFormGroup } from "./styles";
import { useEffect, useState } from "react";

export function Login() {

  const { isAuthentication, login } = useAuth();

  const navigate = useNavigate();

 
  useEffect(()=>{
    isAuthentication == true && navigate('/')
  },[])
  function handleSubmit(e:any) {
    e.preventDefault();

    const dataLogin = {
      "email": email,
      "senha": senha,
      //Rodrigo@2022
    };

     login(dataLogin); //HABILITAR ESSE MÉTODO QUANDO INTEGRAR COM API

    
  }
 const [email,setEmail] = useState('');
 const [senha,setSenha] = useState('');
  return (
    <LoginContainer>
      <LoginContent>
        <header>
          <img src={logoLogin} />
        </header>
        <LoginForm onSubmit={handleSubmit}>
          <LoginFormGroup>
            <img src={userIcon} />
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              />
          </LoginFormGroup>

          <LoginFormGroup>
            <img
              src={passwordIcon}
              style={{
                padding: "19px 0px 0px 12px"
              }}
            />
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e)=>{setSenha(e.target.value)}}
            />
          </LoginFormGroup>

          <ButtonDefault
            type="submit"
            disabled={false}
          >
            Entrar
          </ButtonDefault>
        </LoginForm>
      </LoginContent>
    </LoginContainer >
  );
}