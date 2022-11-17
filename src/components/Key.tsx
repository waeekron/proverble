import styled from 'styled-components';

const StyledKey = styled.div`
  display: inline;
  border: 1px solid black;
  min-width: 32px;
  min-height: 32px;
  border-radius: 10%;
  padding: 0.4rem;
  background: snow;
  cursor: pointer;
  outline: 1px solid #f4def4;

  &: hover {
    background: #f4def4;
    transform: scale(0.95);
    transition: all 0.1s ease-in;
    text-shadow: 0.81px 0.51px gray;
  }
`;
const Key: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledKey>{children}</StyledKey>;
};

export default Key;
