import styled from 'styled-components';

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

export const StyledKey = styled.button<{
  variant: 'notGuessed' | 'almost' | 'wrong' | 'correct';
}>`
  font: inherit;
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
  border: ${({ theme, variant }) =>
    `1px solid ${
      variant !== 'notGuessed' ? theme.colors[variant] : theme.border
    } `};
  &: hover {
    opacity: 0.8;
    transform: scale(0.95);
    transition: all 0.1s ease-in;
  }
`;
