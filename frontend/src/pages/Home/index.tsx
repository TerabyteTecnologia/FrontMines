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

const exampleReturnGeneratedMines: generatedMines =
{
  "qtd_minas": 3,
  "entradas": [
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    0
  ]
};

export function Home() {

  const [dataGeneratedMines, setDataGeneratedMines] = useState<generatedMines | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function generateRange(number: number) {
    return Array.from({ length: number }, (_, i) => i + 1);
  }

  function postGeneratedMine() {
    setLoading(true);

    setTimeout(() => {
      setDataGeneratedMines(exampleReturnGeneratedMines);
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