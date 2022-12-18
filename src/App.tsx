import React, { useEffect, useState } from 'react';
import styled, { css, keyframes, ThemeProvider } from 'styled-components';
import isEqual from 'lodash/isEqual';
import WordBox from './components/WordBox';
import Header from './components/Header';
import Global from './styles/global';
import KeyBoard from './components/KeyBoard';
import { Letter } from './types';
import { keys } from './utils/constants';
import { base, light } from './styles/themes';

export const lightTheme = {
  background: '#fff',
  color: '#1d1f28',
  buttonBg: '#c5718d'
};

export const darkTheme = {
  background: '#1d1f28',
  color: '#fafafa',
  buttonBg: '#515d90'
};
//TODO light/dark theme
const toggleTheme = styled.button`
  font-family: 'Monaco', monospace;
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.buttonBg};
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.5rem;
`;
// const fadeIn = keyframes`
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// `;

// const scaleIn = keyframes`
// 0% {
//   transform: scale(1.1);
// }

// 50% {
//   transform: scale(2.05);
// }

// 100% {
//   transform: scale(1)
// }
// `;

// const animation = (props: any) =>
//   css`
//     ${fadeIn} ${props.animationLength} infinite alternate;
//   `;

// const animation2 = (props: any) =>
//   css`
//     ${scaleIn} 2s ease-in;
//   `;
const scaleIn = keyframes`
0% {
  transform: rotateY(50deg);
}
50% {
   transform: rotateX(180deg);
}
100% {
 transform: rotateX(0deg);
}

`;
export const animation2 = (props: any) =>
  css`
    ${scaleIn} 1s ease-in;
  `;
export const Div = styled.div<{
  flexDirection?: string;
  border?: boolean;
  justify?: string;
  paddingYX?: number[];
  minHeight?: string;
  minWidth?: string;
  gap?: string;
  align?: string;
  animate?: boolean;
  variant?: string;
  width?: string;
}>`
  ${({ variant }) => !variant && `animation: ${animation2};`};
  animation: ${({ variant }) => (variant ? animation2 : 'none')};
  font-size: 1.1em;
  text-align: center;
  border: ${(props) => (props.border ? '1px solid lightgrey' : 'none')};
  padding: ${(props) =>
    props.paddingYX
      ? `${props.paddingYX[0]}em ${props.paddingYX[1]}em`
      : 'auto'};
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justify};
  margin: 0.1em auto;
  text-transform: capitalize;
  color: black;
  min-width: ${(props) => props.minWidth || 'fit-content'};
  min-height: ${(props) => props.minHeight};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.align};
  border-radius: 0.25em;
  background-color: ${({ variant, theme }) =>
    variant === 'wrong'
      ? theme.colors.wrong
      : variant === 'almost'
      ? theme.colors.almost
      : variant === 'correct'
      ? theme.colors.correct
      : theme.background};
  color: ${({ variant, theme }) => (!variant ? theme.colors.text : 'snow')};
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  width: ${({ width }) => width || 'auto'};
  transition: all 0.3s ease-in;
`;

const Proverb = styled.div`
  text-transform: none;
`;

const Container = styled.div`
  height: 100dvh;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/* function WordBox({
  guess,
  colindex,
  rowindex,
  currentrow
}: {
  guess: any;
  colindex: number;
  rowindex: number;
  currentrow: number;
}) {
  // console.log(guess[rowindex][colindex].length === 1, colindex)
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
        border
      >
        <Span>{guess[rowindex][colindex].char}</Span>
      </Div>
    );
  }

  if (guess[rowindex][colindex].length === 1) {
    return (
      <Div
        animate={guess[rowindex][colindex].length === 1}
        align="center"
        justify="center"
        minWidth="50px"
        minHeight="50px"
        paddingYX={[0, 0]}
        border
      >
        <Span>{guess[rowindex][colindex]}</Span>
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
      border
    >
      {/* {guess[rowindex][colindex]} }
    </Div>
  );
} 
*/

//const words: string[] = ['kissa', 'koira', 'laulu', 'lukki'];

function App() {
  const theme = { ...base, ...light };
  const words = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ];
  const word = 'kissa';

  const [guess, setGuess] = useState<string>(() => '');
  const [row, setRow] = useState(() => 0);
  const [guesses, setGuesses] =
    useState<(string | { index: number; char: string; value: number })[][]>(
      words
    );
  const [guessedLetters, setGuessedLetters] = useState(
    new Map<Letter, 'wrong' | 'almost' | 'correct'>()
  );
  function check(guess: string, word: string) {
    const guessArray: Letter[] = guess.split('').map((str) => {
      if (isAllowedKey(str)) return str as Letter;
      throw new Error('Not a valid letter');
    });

    const wordArray = word.split('');
    const guessIsRight = isEqual(guessArray, wordArray);

    let checkedWord;

    setRow(row + 1);
    setGuess('');
    //check which letters are correct
    checkedWord = guessArray.map((char, index) => {
      // if char at the index is correct we return {char, 1}
      if (char === wordArray[index]) return { char, index, value: 1 };
      if (
        char !== wordArray[index] &&
        wordArray.slice(0, guessArray.length).some((char2, index2) => {
          // console.log({ char, char2, bool: char === char2 });
          return char === char2;
        })
      ) {
        return { char, index, value: -1 };
      }
      return { char, index, value: 0 };
    });
    const newState = [...guesses];
    newState[row] = checkedWord;

    setGuesses(newState);

    const newGuessedLetters = new Map(guessedLetters);
    if (checkedWord) {
      checkedWord
        .map((guess) => guess as { value: number; char: Letter; index: number })
        .forEach((guess) => {
          console.log(guess);
          const variant =
            guess.value === 1
              ? 'correct'
              : guess.value === 0
              ? 'wrong'
              : 'almost';
          newGuessedLetters.set(guess.char, variant);
        });
    }
    setGuessedLetters(newGuessedLetters);
    if (guessIsRight) setRow(-1);
  }
  console.log(guessedLetters);
  function isAllowedKey(key: string): boolean {
    const isAllowed = keys.find((k) => k === key);
    return !!isAllowed;
  }
  function handleKeyPress(e: KeyboardEvent) {
    if (!isAllowedKey(e.key)) return;
    const newState = [...guesses];
    if (e.key === 'Backspace') {
      setGuess(guess.slice(0, -1));
      newState[row][guess.length - 1] = '';
      return;
    } else if (guess.length === words[0].length && e.key === 'Enter') {
      check(guess, word);
      return;
    } else if (e.key !== 'Enter' && guess.length < guesses[0].length) {
      setGuess(guess + e.key);

      newState[row][guess.length] = e.key;
      setGuesses(newState);
    }
  }
  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);
    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  });
  return (
    <ThemeProvider theme={theme}>
      <Div justify="space-around" width="100dvw">
        <Global />
        <Container>
          <Div justify="center" flexDirection="column">
            <Div minHeight="50vh" flexDirection="column">
              <Proverb>Laskee kuin ______ häntä</Proverb>
              <Div justify="spaceAround" flexDirection="column">
                {words.map((word: string[], rowindex) => (
                  <Div key={`row-${rowindex}`} gap=".15em">
                    {word.map((letter: string, colindex) => (
                      <WordBox
                        key={colindex}
                        currentrow={row}
                        rowindex={rowindex}
                        colindex={colindex}
                        guess={guesses}
                      />
                    ))}
                  </Div>
                ))}
              </Div>{' '}
            </Div>
          </Div>
          <KeyBoard
            guessedLetters={guessedLetters}
            handleKeyPress={handleKeyPress}
          />{' '}
        </Container>
      </Div>
    </ThemeProvider>
  );
}

export default App;
