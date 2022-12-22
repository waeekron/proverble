import { Div } from '../../styles/styled';
import AnimatedLetter from './AnimatedLetter';

interface WordBoxProps {
  guess: any;
  colindex: number;
  rowindex: number;
  currentrow: number;
  children?: React.ReactNode;
}

const WordBox: React.FC<WordBoxProps> = ({
  guess,
  colindex,
  rowindex,
  currentrow
}) => {
  const len = 500 / (guess.length + 2);
  const sideLength = `${500 / (guess[0].length + 2)}px`;
  if (typeof guess[rowindex][colindex] === typeof {}) {
    const obj = guess[rowindex][colindex];
    const variant =
      obj.value === 0 ? 'wrong' : obj.value === 1 ? 'correct' : 'almost';

    return (
      <Div
        variant={variant}
        animate={guess[rowindex][colindex].length === 1}
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
          {guess[rowindex][colindex].char}
        </AnimatedLetter>
      </Div>
    );
  }

  return (
    <Div
      animate={guess[rowindex][colindex].length === 1}
      align="center"
      justify="center"
      minWidth={len > 50 ? '50px ' : sideLength}
      minHeight={len > 50 ? '50px ' : sideLength}
      maxWidth={'50px'}
      maxHeight={'50px'}
      width="50px"
      paddingYX={[0, 0]}
      border={!guess[rowindex][colindex]}
    >
      <AnimatedLetter animate={!!guess[rowindex][colindex]}>
        {guess[rowindex][colindex]}
      </AnimatedLetter>
    </Div>
  );
};

export default WordBox;
