import React, { useEffect, useState } from 'react';
import './App.css';
import styled, { css, keyframes } from 'styled-components';
import isEqual from 'lodash/isEqual';
import WordBox from './components/WordBox';
import Header from './components/Header';
import Global from './styles/global';
import KeyBoard from './components/KeyBoard';

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
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
0% {
  transform: scale(1.1);
}

50% {
  transform: scale(1.05);
}

100% {
  transform: scale(1)
}
`;

const animation = (props: any) =>
  css`
    ${fadeIn} ${props.animationLength} infinite alternate;
  `;

const animation2 = (props: any) =>
  css`
    ${scaleIn} .2s ease-in;
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
  font-size: 1.1em;
  text-align: center;
  color: palevioletred;
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
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.align};
  border-radius: 0.3em;
  background-color: ${({ variant }) => variant};
  color: ${({ variant }) => (variant ? 'snow' : 'black')};
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  width: ${({ width }) => width};
`;

const Proverb = styled.div`
  text-transform: none;
`;

const Container = styled.div`
  width: 100%;
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

  function check(guess: string, word: string) {
    const guessArray = guess.split('');
    const wordArray = word.split('');
    const guessIsRight = isEqual(guessArray, wordArray);

    if (guessIsRight) {
      alert('ding ding ding');
    }
    if (!guessIsRight) {
      setRow(row + 1);
      setGuess('');
      //check which letters are correct
      const checkedWord = guessArray.map((char, index) => {
        // if char at the index is correct we return {char, 1}
        if (char === wordArray[index]) return { char, index, value: 1 };
        if (
          char !== wordArray[index] &&
          wordArray.slice(0, guessArray.length).some((char2, index2) => {
            console.log({ char, char2, bool: char === char2 });
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
    }
  }

  function handleKeyPress(e: KeyboardEvent) {
    console.log(e.key);
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
    <Container>
      <Global />

      <Div justify="center" flexDirection="column">
        <Div justify="spaceAround" flexDirection="column">
          <Proverb>Laskee kuin ______ häntä</Proverb>
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
          <KeyBoard />
        </Div>
      </Div>
    </Container>
  );
}

export default App;
