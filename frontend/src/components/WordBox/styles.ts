import styled, { keyframes, css } from 'styled-components';

const borderWave = keyframes`
  0% {
    opacity: .9;
    
    border-radius: 20%;
  }
  50% {    
    border-radius: 10%;
  }
  100% {
    opacity:1;
  }

`;
const borderWaveAnimation = (props: any) =>
  css`
    ${borderWave} 250ms ease-in-out;
  `;
export const AnimatedSpan = styled.span`
  animation: ${borderWaveAnimation};
  animation-fill-mode: forwards;
  min-width: inherit;
  min-height: inherit;
  margint-top: 1em;
  border: ${({ theme }) => `1px solid ${theme.border}`};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  border-radius: 20%;
  font-size: 1em;
`;
