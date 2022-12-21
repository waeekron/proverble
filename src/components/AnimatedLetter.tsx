import styled, { keyframes, css } from 'styled-components';

const scaleIn = keyframes`
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
export const animation2 = (props: any) =>
  css`
    ${scaleIn} 250ms ease-in-out;
  `;
const Span = styled.span`
  animation: ${animation2};
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

interface AnimatedLetterProps {
  children: React.ReactNode;
  animate: boolean;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ children, animate }) =>
  animate ? <Span>{children}</Span> : <>{children}</>;

export default AnimatedLetter;
