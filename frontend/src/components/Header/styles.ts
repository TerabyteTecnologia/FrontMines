import styled from "styled-components";


export const HeaderContainer = styled.header`
  background: ${props => props.theme["blue-700"]};
  color: ${props => props.theme["white"]};;
  padding: 1.5rem;
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
`;