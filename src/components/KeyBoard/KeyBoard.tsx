import Key from './Key';
import { HiArrowLeft } from 'react-icons/hi';
import { Letter } from '../../types';
import { StyledKeyBoard, StyledKeyRow, Span } from './styles';

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
