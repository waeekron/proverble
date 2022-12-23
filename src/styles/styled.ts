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
  border: ${({ border }) => (border ? '1px solid lightgrey' : 'none')};
  padding: ${({ paddingYX }) =>
    paddingYX ? `${paddingYX[0]}em ${paddingYX[1]}em` : 'auto'};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justify }) => justify};
  margin: ${({ marginY }) => (marginY || 'auto') + ' auto'};
  text-transform: capitalize;
  color: black;
  min-width: ${({ minWidth }) => minWidth || 'fit-content'};
  min-height: ${({ minHeight }) => minHeight};
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
  font-size: 1rem;
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

export const L = styled.span<{ borderWidth?: number }>`
  color: ${({ color }) => color};
  display: inline-block;
  border-bottom: ${({ borderWidth, color, theme }) =>
    `${borderWidth || 3}px solid ${color ? color : theme.border}`};
  min-width: 1rem;
  min-height: 1rem;
  margin-right: 0.1em;
  font-size: 1em;
`;
