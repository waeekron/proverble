import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
0% {
  transform: rotateY(50deg);
}
50% {
   transform: rotateX(180deg);
}
100% {
 transform: rotateX(0deg);
}
`;

export const rotateAnimation = (props: any) =>
  css`
    ${rotate} 1s ease-in;
  `;

export const Div = styled.div<{
  flexDirection?: string;
  border?: boolean;
  justify?: string;
  paddingYX?: number[];
  minHeight?: string;
  minWidth?: string;
  maxWidth?: string;
  maxHeight?: string;
  gap?: string;
  align?: string;
  animate?: boolean;
  variant?: string;
  width?: string;
  marginY?: string;
}>`
  ${({ variant }) => !variant && `animation: ${rotateAnimation};`};
  animation: ${({ variant }) => (variant ? rotateAnimation : 'none')};
  font-size: 1.1em;
  text-align: center;
  border: ${(props) => (props.border ? '1px solid lightgrey' : 'none')};
  padding: ${(props) =>
    props.paddingYX
      ? `${props.paddingYX[0]}em ${props.paddingYX[1]}em`
      : 'auto'};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justify};
  margin: ${({ marginY }) => (marginY || 'auto') + ' auto'};
  text-transform: capitalize;
  color: black;
  min-width: ${(props) => props.minWidth || 'fit-content'};
  min-height: ${(props) => props.minHeight};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.align};
  border-radius: 0.25em;
  background-color: ${({ variant, theme }) =>
    variant === 'wrong'
      ? theme.colors.wrong
      : variant === 'almost'
      ? theme.colors.almost
      : variant === 'correct'
      ? theme.colors.correct
      : theme.background};
  color: ${({ variant, theme }) => (variant ? 'white' : theme.text)};
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  width: ${({ width }) => width || 'auto'};
  transition: background 0.3s ease-in;
  max-height: 100dvh;
`;

export const Proverb = styled.div`
  text-transform: none;
  font-style: italic;
  font-size: 0.9rem;
  padding: 0em 1em;
  color: ${({ theme }) => theme.text};
`;

export const Container = styled.div`
  height: 100dvh;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const StyledKeyBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 0.2em;
  margin-bottom: 1em;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
`;

export const StyledKeyRow = styled.div`
  padding: 0.1em;
  display: flex;
  gap: 0.2em;
  width: 100%;
`;

export const Span = styled.span<{}>`
  // flex: 1;
`;

export const StyledKey = styled.div<{ variant: string }>`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10%;
  padding: 0.3rem;
  background: ${({ theme, variant }) => theme.colors[variant]};
  cursor: pointer;
  height: 50px;
  flex: 1;
  transition: background 0.3s ease-in;
  color: ${({ theme }) => theme.colors.keyboard};
  border: ${({ theme }) => `1px solid ${theme.border}`};
  &: hover {
    opacity: 0.8;
    transform: scale(0.95);
    transition: all 0.1s ease-in;
  }
`;
