import styled from "styled-components";


export const HeaderContainer = styled.header`
  background: ${props => props.theme["blue-700"]};
  color: ${props => props.theme["white"]};

  padding: 1.5rem;
  @media only screen and (max-width: 400px) {
    padding: 1.3rem 2rem 1.3rem 2rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  
  font-size: 1.5rem;
  font-weight: 700;
  @media only screen and (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

export const ButtonLink = styled.a`
  cursor: pointer;
`