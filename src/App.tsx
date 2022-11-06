import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import styled, { css, keyframes } from 'styled-components';

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
`

const scaleIn = keyframes`
0% {
  transform: scale(1);
}

50% {
  transform: scale(1.05);
}

100% {
  transform: scale(1)
}
`

const animation = (props: any) =>
  css`
    ${fadeIn} ${props.animationLength} infinite alternate;
  `

const animation2 = (props: any) =>
  css`
    ${scaleIn} .2s ease-in-out;
  `

const Div = styled.div<{
  flexDirection?: string;
  border?: boolean;
  justify?: string;
  paddingYX?: number[];
  minHeight?: string;
  minWidth?: string;
  gap?: string;
  align?: string
  animate?: boolean;
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
  align-items: ${props => props.align};
  border-radius: .3em;

`;

const Span = styled.span`
animation: ${animation2};
width:100%;
height:100%;
margint-top:1em;
border: 2px solid black;
display:flex;
justify-content: center;
align-items: center;
font-family: "Comic Sans MS", "Comic Sans", cursive;
border-radius: .3em;
`;

function WordBox({ guess, colindex, rowindex, currentrow }: { guess: any, colindex: number, rowindex: number, currentrow: number }) {
  // console.log(guess[rowindex][colindex].length === 1, colindex)
  if (guess[rowindex][colindex].length === 1) {
    return (
      <Div animate={guess[rowindex][colindex].length === 1} align='center' justify='center' minWidth="50px" minHeight="50px" paddingYX={[0, 0]} border>
        <Span>{guess[rowindex][colindex]}</Span>
      </Div>
    )
  }
  return (

    <Div animate={guess[rowindex][colindex].length === 1} align='center' justify='center' minWidth="50px" minHeight="50px" paddingYX={[0, 0]} border>
      {/* {guess[rowindex][colindex]} */}
    </Div>
  );
}

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
  const keys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä'], ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter',]]
  const [guess, setGuess] = useState<string>(() => '');
  const [row, setRow] = useState(0);
  const [guesses, setGuesses] = useState<string[][]>(words)

  function check() {
    if (guess.length !== words[0].length) {
      console.log('not enaugh words')
    }

  }

  function handleKeyPress(e: KeyboardEvent) {
    const newState = [...guesses]
    if (e.key === 'Backspace') {
      setGuess(guess.slice(0, -1))
      newState[row][guess.length - 1] = ''
      return
    } else if (guess.length === words[0].length) {
      return;
    } else if (e.key === 'Enter') {
      check();
    }
    else {
      setGuess(guess + e.key)
    }

    console.log(e.key);
    newState[row][guess.length] = e.key
    setGuesses(newState)
    console.log(guesses)
  }
  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress)
    return () => {
      window.removeEventListener('keyup', handleKeyPress)
      console.log('effect return')
    }
  });
  return (
    <Div justify="center" flexDirection="column">
      <h1>Turdle</h1>
      guess: {guess}
      <Div justify="spaceAround" flexDirection="column">
        {words.map((word: string[], rowindex) => (
          <Div key={`row-${rowindex}`} gap=".15em">
            {word.map((letter: string, colindex) => (
              <WordBox key={colindex} currentrow={0} rowindex={rowindex} colindex={colindex} guess={guesses}></WordBox>
            ))}
          </Div>
        ))}
      </Div>
    </Div>
  );
}

export default App;
