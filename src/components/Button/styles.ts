import styled from "styled-components";

export const Button = styled.button`
  border: 0;
  border-radius: 1.563rem;
  background: ${props => props.theme["blue-800"]};
  color:  ${props => props.theme["white"]};
  font-weight: bold;
  padding: 0 4.25rem;
  height: 3.125rem;

  width: 100%;
  
  cursor: pointer;

  &:hover {
    background: ${props => props.theme["blue-hover"]};
  } 

  &:disabled {
    background: rgba(0, 52, 153, 0.6);
    color:  ${props => props.theme["gray-100"]};
    cursor: no-drop;
  }
`;