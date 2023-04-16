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

  const { isAuthentication, login,loading,tentativas,setTentativas } = useAuth();

  const navigate = useNavigate();

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const key = '6Lfmz5ElAAAAAPy39vbsi1LBIGdBzjGvunXXSZG1'
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  let timeInicial = localStorage.getItem('totalTimeSecondLogin')
  const [totalTimeSecondLogin,settotalTimeSecondLogin] = useState((timeInicial ? parseInt(timeInicial):0));
  const minutes = Math.floor(totalTimeSecondLogin / 60);
  const seconds =totalTimeSecondLogin % 60;
  
  useEffect(()=>{
    const intervar = setInterval(() =>{
       if(totalTimeSecondLogin == 0){
         return
       }else{
         settotalTimeSecondLogin(totalTimeSecondLogin -1);
         localStorage.setItem('totalTimeSecondLogin',(totalTimeSecondLogin -1).toString())
 
        }
     },1000)
     return()=>{
      setTentativas(0)
       clearInterval(intervar);
     }
   },[totalTimeSecondLogin])

  useEffect(()=>{
    isAuthentication == true && navigate('/')
  },[])
  function handleSubmit(e:any) {
    e.preventDefault();
   
    if(totalTimeSecondLogin == 0){
    const dataLogin = {
      "email": email,
      "senha": senha,
      //Rodrigo@2022
    };
   

     if(tentativas >= 3){
      settotalTimeSecondLogin((3*60))
     }
      if(recaptchaToken){
       // Verifica se o token do reCAPTCHA é válido
       login(dataLogin); //HABILITAR ESSE MÉTODO QUANDO INTEGRAR COM API
      }else{
          alert('Captcha Invalido')
      }
    }

    
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
          <CaptchaContainer>
          <Recaptcha sitekey={key} onChange={handleRecaptchaChange} />
          </CaptchaContainer>
          <ButtonDefault
            type="submit"
            disabled={loading  || !recaptchaToken ||  totalTimeSecondLogin != 0}
          >
           
            {totalTimeSecondLogin == 0 ? 'Entrar' : `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`}
          </ButtonDefault>
        </LoginForm>
        <LinkSenha href="/recovery">Esqueçeu Senha Clique Aqui</LinkSenha>
      </LoginContent>
    </LoginContainer >
  );
}