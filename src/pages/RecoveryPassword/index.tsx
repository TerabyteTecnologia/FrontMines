import { useNavigate } from "react-router-dom";

import logoLogin from '../../assets/images/logo_login.png';
import userIcon from '../../assets/icons/person.svg';
import passwordIcon from '../../assets/icons/password.svg';

import { Input } from "../../components/Input";
import { ButtonDefault } from "../../components/Button";

import { useAuth } from "../../contexts/Auth";

import { LabelForm, LoginContainer, LoginContent, LoginForm, LoginFormGroup } from "./styles";
import { useEffect, useState } from "react";

export function Recovery() {

  const { isAuthentication, recovery,loading } = useAuth();

  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [senhaNew,setSenhaNew] = useState('');

 
  useEffect(()=>{
    isAuthentication == true && navigate('/')
  },[])
  function handleSubmit(e:any) {
    e.preventDefault();
   
    const dataLogin = {
      "email": email,
      "senha": senha,
      "senhaNova":senhaNew,
      //Rodrigo@2022

    };
    

    recovery(dataLogin); //HABILITAR ESSE MÉTODO QUANDO INTEGRAR COM API

    
  }

  return (
    <LoginContainer>
      <LoginContent>
        <header>
          <img src={logoLogin} />
        </header>
    
        <LoginForm onSubmit={handleSubmit}>
        <LabelForm>Trocar Senha</LabelForm>
          <LoginFormGroup>
            <img src={userIcon} />
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              />
              <label>{}</label>
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
              placeholder="Senha Antiga"
              value={senha}
              onChange={(e)=>{setSenha(e.target.value)}}
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
              id="passwordNew"
              type="passwordNew"
              placeholder="Senha Nova"
              value={senhaNew}
              onChange={(e)=>{setSenhaNew(e.target.value)}}
            />
          </LoginFormGroup>

          <ButtonDefault
            type="submit"
            disabled={loading}
          >
            Recuperar
          </ButtonDefault>
        </LoginForm>
      </LoginContent>
    </LoginContainer >
  );
}