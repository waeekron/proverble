import { Div } from '../../styles/styled';
import AnimatedLetter from './AnimatedLetter';

interface WordBoxProps {
  guesses: (
    | string
    | {
        index: number;
        char: string;
        value: number;
      }
  )[][];
  colindex: number;
  rowindex: number;
  currentrow: number;
  children?: React.ReactNode;
}

const WordBox: React.FC<WordBoxProps> = ({
  guesses,
  colindex,
  rowindex,
  currentrow
}) => {
  const len = 500 / (guesses.length + 2);
  const sideLength = `${500 / (guesses[0].length + 2)}px`;
  if (typeof guesses[rowindex][colindex] === 'object') {
    const guess = guesses[rowindex][colindex] as {
      index: number;
      char: string;
      value: number;
    };
    const variant =
      guess?.value === 0 ? 'wrong' : guess.value === 1 ? 'correct' : 'almost';

    return (
      <Div
        variant={variant}
        align="center"
        justify="center"
        minWidth={len > 50 ? '50px ' : sideLength}
        minHeight={len > 50 ? '50px ' : sideLength}
        maxWidth={'50px'}
        maxHeight={'50px'}
        width="50px"
        paddingYX={[0, 0]}
      >
        <AnimatedLetter animate={rowindex === currentrow}>
          {guess.char}
        </AnimatedLetter>
      </Div>
    );
  }
  const guess = guesses[rowindex][colindex] as string;
  return (
    <Div
      animate={guess.length === 1}
      align="center"
      justify="center"
      minWidth={len > 50 ? '50px ' : sideLength}
      minHeight={len > 50 ? '50px ' : sideLength}
      maxWidth={'50px'}
      maxHeight={'50px'}
      width="50px"
      paddingYX={[0, 0]}
      border={!guess}
    >
      <AnimatedLetter animate={!!guess}>{guess}</AnimatedLetter>
    </Div>
  );
};

export default WordBox;
