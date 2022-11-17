import styled, { keyframes, css } from 'styled-components';

const scaleIn = keyframes`
0% {
  transform: scale(1);
}

50% {
  transform: scale(1.05);
}

100% {
  transform: scale(1)
}
`;
const animation2 = (props: any) =>
  css`
    ${scaleIn} .2s ease-in;
  `;
const Span = styled.span`
  animation: ${animation2};
  width: 100%;
  height: 100%;
  margint-top: 1em;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  border-radius: 0.3em;
  font-size: 1.1em;
`;

interface AnimatedLetterProps {
  children: React.ReactNode;
  animate: boolean;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ children, animate }) =>
  animate ? <Span>{children}</Span> : <>{children}</>;

export default AnimatedLetter;
