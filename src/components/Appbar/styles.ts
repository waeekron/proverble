import styled from 'styled-components';

export const AppbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8em;
  width: 100%;
`;

export const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.3);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5em;
  font-size: 1.6rem;
  &:focus {
    outline: none;
  }
`;

export const Logo = styled.h1`
  color: pink;
  text-transform: none;
  font-size: 0.9em;
`;

export const Split = styled.span<{ split: boolean; direction: number }>`
  display: inline-block;
  transform: ${({ split, direction }) =>
    split === true ? `translate(0px, ${direction}px)` : ''};
  transition: all 0.2s ease-in;
`;
