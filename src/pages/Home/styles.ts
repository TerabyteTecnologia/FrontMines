import styled, { css } from "styled-components";

interface MinesProps {
  variant?: number;
}

export const HomeContainer = styled.div`
  max-width: 1200px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 0 auto;
  
  padding: 1.875rem 1.25rem;

  header {
    img {
      width: 140px;
      height: 140px;
    }
  }

  @media only screen and (max-width: 400px) {
    header {
    img {
      width: 100px;
      height: 100px;
    }
  }
  }
`;

export const SpinnerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.188rem;

  margin: 9.375rem 0;
  color: ${props => props.theme["white"]};
`;

export const MinesContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 64px);

  gap: 0.938rem;
  margin: 3.75rem 0 0 0;

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(5, 55px);
    gap: 0.625rem;
    margin: 0.75rem 0 0 0;
  }

  @media only screen and (max-width: 335px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
  }
`;

export const Information = styled.p`
  top: 2.188rem;

  position: relative;
  line-height: 1.875rem;
  font-weight: 400;

  color: ${props => props.theme["white"]};

  span {
    font-weight: 700;
  }
`;

export const Mines = styled.button<MinesProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto; 
  box-sizing: border-box;

  width: 4rem;
  height: 4rem;

  background: #014A93;
  border: 0.188rem solid ${props => props.theme["blue-500"]};
  border-radius: 0.625rem;

  span {
    width: 1.25rem;
    height: 1.25rem;

    background: ${props => props.theme["blue-400"]};
    box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25); 
    border-radius: 50%;

    @media only screen and (max-width: 400px) {
      width: 1rem;
      height: 1rem;
    }
  }

  ${props => props.variant === 0 && css`
    background: linear-gradient(180deg, #F9B519 0%, #EF9201 100%);
    
  `}

    @media only screen and (max-width: 400px) {
      width: 50px;
      height: 50px;
    }
`;

export const AccessGame = styled.a`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  position: relative;

  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme["white"]};

  top: 3.125rem;
`;

export const ButtonGeneratedHack = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  margin-top: 100px;

  button {
    width: 382px;
  }
  @media only screen and (max-width: 400px) {
    margin-top: 40px;
    }
  @media only screen and (max-width: 720px) {
    button {
      width: 100%;
    } 
  }
`;


