import { useState } from "react";

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
    qtd_minas: numero_minas,
    entradas: minas,
  };
  return retorno;

 }



export function Home() {

  const [dataGeneratedMines, setDataGeneratedMines] = useState<generatedMines | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function generateRange(number: number) {
    return Array.from({ length: number }, (_, i) => i + 1);
  }

  async function postGeneratedMine() {
    setLoading(true);
    const jogos = await gerarJogo();
    setTimeout(() => {
      setDataGeneratedMines(jogos);
      setLoading(false);

    }, 3000);
  }

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

        <AccessGame>
          <img src={link} /> Acessar Game
        </AccessGame>

      </Visibility>


      <ButtonGeneratedHack>
        <ButtonDefault onClick={postGeneratedMine}>
          Gerar Hack
        </ButtonDefault>
      </ButtonGeneratedHack>
    </HomeContainer>
  );
};