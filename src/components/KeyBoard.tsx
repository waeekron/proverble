import styled from 'styled-components';
import Key from './Key';

const StyledKeyBoard = styled.div`
  display: grid;
  justify-content: space-evenly;
  justify-items: center;
  gap: 0.2em;
  width: 500px;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 3em;
`;

const StyledKeyRow = styled.div`
  display: flex;
  gap: 0.4em;
`;

const KeyBoard = () => {
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
  ];
  return (
    <StyledKeyBoard>
      {keys.map((row, index) => (
        <StyledKeyRow key={index}>
          {row.map((key) => (
            <Key key={key + index}>{key}</Key>
          ))}
        </StyledKeyRow>
      ))}
    </StyledKeyBoard>
  );
};
export default KeyBoard;
