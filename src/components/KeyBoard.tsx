import styled from 'styled-components';
import Key from './Key';
import { HiArrowLeft } from 'react-icons/hi';
import { Letter } from '../types';
const StyledKeyBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 0.2em;
  margin-bottom: 2em;
  width: 100%;
`;

const StyledKeyRow = styled.div`
  padding: 0.1em;
  display: flex;
  gap: 0.2em;
  width: 100%;
`;

const Span = styled.span<{}>`
  // flex: 1;
`;

interface KeyBoradProps {
  handleKeyPress: (e: KeyboardEvent) => void;
  guessedLetters: Map<Letter, 'wrong' | 'almost' | 'correct'>;
}

const KeyBoard = ({ handleKeyPress, guessedLetters }: KeyBoradProps) => {
  const keys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
  ];

  function isGuessed(
    letter: Letter
  ): [variant: 'wrong' | 'almost' | 'correct' | 'notGuessed'] {
    const variant = guessedLetters.get(letter);
    console.log(variant);
    return variant ? [variant] : ['notGuessed'];
  }
  return (
    <StyledKeyBoard>
      {keys.map((row, index) => (
        <StyledKeyRow key={index}>
          {row.map((key) => (
            <Key
              onClick={() =>
                handleKeyPress(new KeyboardEvent('keydown', { key }))
              }
              key={key + index}
              variant={isGuessed(key as Letter)}
            >
              <Span>{key === 'Backspace' ? <HiArrowLeft /> : key}</Span>
            </Key>
          ))}
        </StyledKeyRow>
      ))}
    </StyledKeyBoard>
  );
};
export default KeyBoard;
