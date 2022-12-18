import styled from 'styled-components';
import { Letter } from '../types';

const StyledKey = styled.div<{ variant: string }>`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid black;
  border-radius: 10%;
  padding: 0.3rem;
  background: ${({ theme, variant }) => theme.colors[variant]};
  cursor: pointer;
  outline: 1px solid #f4def4;
  height: 50px;
  flex: 1;
  transition: background 0.3s ease-in;
  &: hover {
    opacity: 0.8;
    transform: scale(0.95);
    transition: all 0.1s ease-in;
  }
`;
const Key: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  variant: [variant: 'wrong' | 'almost' | 'correct' | 'notGuessed'];
}> = ({ children, onClick, variant }) => {
  const [variantValue] = variant;
  // console.log(variant);
  return (
    <StyledKey variant={variantValue} onClick={onClick}>
      {children}
    </StyledKey>
  );
};

export default Key;
