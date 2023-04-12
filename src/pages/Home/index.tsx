import { useEffect, useState } from "react";

import { ButtonDefault } from "../../components/Button";
import { Visibility } from "../../components/Visibility";
import { Spinner } from "../../components/Spinner";

import logoMines from '../../assets/images/logo_login.png';
import bomb from '../../assets/images/bomb.png';
import start from '../../assets/images/start.png';
import link from '../../assets/icons/link.svg';

import { generatedMines } from "./interface";

import {
  AccessGame,
  ButtonGeneratedHack,
  HomeContainer,
  Information,
  Mines,
  MinesContent,
  SpinnerContent
} from "./styles";
import { HttpAuth } from "../../config/http";
import { useAuth } from "../../contexts/Auth";



 async function ReturnResultMiner(){
   const finelResult = HttpAuth.get('/estrategia/showminer',{
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('@TerabyteTecnologia-:token-1.0.0'),
      }
  
    })
    
    return finelResult;
   
  }

  async function  gerarJogo() {

   const resultBank = await ReturnResultMiner();
   
   var espera = resultBank.data.miner.espera;
    var minas_a = resultBank.data.miner.minas_a;
    var minas_b = resultBank.data.miner.minas_b;
    var entrada_min = resultBank.data.miner.entrada_a;
    var entrada_max = resultBank.data.miner.entrada_b;

  let minas = Array(25).fill(1);

  let numero_minas = Math.floor(Math.random() * (minas_b - minas_a + 1)) + minas_a;

  let palpites_entrada:any = [];
  let tamanho_entrada = Math.floor(Math.random() * (entrada_max - entrada_min + 1)) + entrada_min;
  for (let i = 0; i < tamanho_entrada; i++) {
    let palpite = Math.floor(Math.random() * 24) + 1;
    if (!palpites_entrada.includes(palpite)) {
      palpites_entrada.push(palpite);
      minas[palpite] = 0;
    }
  }

  let retorno = {
    espera:espera,
    qtd_minas: numero_minas,
    entradas: minas,
  };
  return retorno;

 }



export function Home() {
  const { verificaUsoUnico } = useAuth();
  const [dataGeneratedMines, setDataGeneratedMines] = useState<generatedMines | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  let timeInicial = localStorage.getItem('totalTimeSecond')
  const [totalTimeSecond,setTotalTimeSecond] = useState((timeInicial ? parseInt(timeInicial):0));
  const minutes = Math.floor(totalTimeSecond / 60);
  const seconds =totalTimeSecond % 60;

  function generateRange(number: number) {
    return Array.from({ length: number }, (_, i) => i + 1);
  }
  
  async function postGeneratedMine() {
    verificaUsoUnico();
    setLoading(true);
    const jogos = await gerarJogo();
      setDataGeneratedMines(jogos);
      localStorage.setItem('@Terabyte:jogos', JSON.stringify(jogos));

      setLoading(false);
      setTotalTimeSecond((jogos.espera*60))

  }
  

  useEffect(()=>{
   const intervar = setInterval(() =>{
      if(totalTimeSecond == 0){
        setDataGeneratedMines(null);
        return
      }else{
        setTotalTimeSecond(totalTimeSecond -1);
        localStorage.setItem('totalTimeSecond',(totalTimeSecond -1).toString())
         const teste = localStorage.getItem('@Terabyte:jogos')
         if(teste){
          const favor = teste && JSON.parse(teste)
          setDataGeneratedMines(favor);
         }
         
         

       }
    },1000)
    return()=>{
      clearInterval(intervar);
    }
  },[totalTimeSecond])

  const showFirstStep = !(dataGeneratedMines?.entradas && dataGeneratedMines?.entradas.length > 0);
  const showSecondStep = !!(dataGeneratedMines?.entradas && dataGeneratedMines?.entradas.length > 0);

  return (
    <HomeContainer>
      <header>
        <img src={logoMines} />
      </header>
      <Visibility visible={loading}>
        <SpinnerContent>
          <Spinner width={60} height={60} />
          <span>Gerando Hack ...</span>
        </SpinnerContent>
      </Visibility>
  
      <Visibility visible={!loading && showFirstStep}>
        <MinesContent>
          {generateRange(25).map(() => (
            <Mines> <span /></Mines>
          ))}
        </MinesContent>
      </Visibility>

      <Visibility visible={!loading && showSecondStep}>

        <Information>
          Selecionar <span>{dataGeneratedMines?.qtd_minas}</span> Minas
        </Information>

        <MinesContent>
          {dataGeneratedMines?.entradas.map((item: number) => {
            return (
              <Mines variant={item}>
                <Visibility visible={item === 0}>
                  <img src={start} />
                </Visibility>

                <Visibility visible={item === 1}>
                  <img src={bomb} />
                </Visibility>
              </Mines>
            );
          })}
        </MinesContent>

        <AccessGame href="https://www.pixluck.bet/register?id=63dec50ac77f1100256c5106" target="_blank">
          <img src={link} /> Acessar Game
        </AccessGame>

      </Visibility>


      <ButtonGeneratedHack>
        <ButtonDefault onClick={postGeneratedMine} disabled={!!totalTimeSecond}>
          {totalTimeSecond == 0 ? 'Gerar Hack' : `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`}
        </ButtonDefault>
      </ButtonGeneratedHack>
    </HomeContainer>
  );
};