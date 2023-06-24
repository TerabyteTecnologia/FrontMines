import { useNavigate } from "react-router-dom";

import logoLogin from '../../assets/images/logo_login.png';
import userIcon from '../../assets/icons/person.svg';
import passwordIcon from '../../assets/icons/password.svg';
import Recaptcha from '../../recaptcha';



import { Input } from "../../components/Input";
import { ButtonDefault } from "../../components/Button";

import { useAuth } from "../../contexts/Auth";

import { CaptchaContainer, LinkSenha, LoginContainer, LoginContent, LoginForm, LoginFormGroup } from "./styles";
import { useEffect, useState } from "react";

export function Login() {

  

  const navigate = useNavigate();

 



  return (
    <LoginContainer>
      <LinkSenha href="/home">
      <LoginContent>
        
        <header>
          <img src={logoLogin} />
        </header>
     
        <span>Seja bem Vindo! click para entrar</span>
      </LoginContent>
      </LinkSenha>
    </LoginContainer >
  );
}