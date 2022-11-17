import { Div } from '../App';
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
  if (typeof guess[rowindex][colindex] === typeof {}) {
    const obj = guess[rowindex][colindex];
    const variant =
      obj.value === 0 ? '#787c7e' : obj.value === 1 ? '#6aaa64' : '#c9b458';

    return (
      <Div
        variant={variant}
        animate={guess[rowindex][colindex].length === 1}
        align="center"
        justify="center"
        minWidth="50px"
        minHeight="50px"
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
      minWidth="50px"
      minHeight="50px"
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
