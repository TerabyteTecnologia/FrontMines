import { useNavigate } from "react-router-dom";

import logoLogin from '../../assets/images/logo_login.png';
import userIcon from '../../assets/icons/person.svg';
import passwordIcon from '../../assets/icons/password.svg';

import { Input } from "../../components/Input";
import { ButtonDefault } from "../../components/Button";

import { useAuth } from "../../contexts/Auth";

import { LoginContainer, LoginContent, LoginForm, LoginFormGroup } from "./styles";

export function Login() {

  const { isAuthentication, login } = useAuth();

  const navigate = useNavigate();

  function handleSubmit() {

    const dataLogin = {
      "email": "alisson",
      "password": "123",
    };

    // login(dataLogin); //HABILITAR ESSE MÉTODO QUANDO INTEGRAR COM API

    navigate("/");  //REMOVER ESTE NAVIGATE APÓS INTEGRAR COM API
  }

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