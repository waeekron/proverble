import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import isEqual from 'lodash/isEqual';
import WordBox from './components/WordBox/WordBox';
import Appbar from './components/Appbar/Appbar';
import Global from './styles/global';
import KeyBoard from './components/KeyBoard/KeyBoard';
import { Letter } from './types';
import { keys } from './utils/constants';
import { base, dark, light } from './styles/themes';
import { Div, Container, Proverb, L } from './styles/styled';

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => ({
    ...base,
    ...light,
    name: 'light'
  }));
  function changeTheme() {
    if (currentTheme.name === 'light')
      setCurrentTheme({ ...base, ...dark, name: 'dark' });
    if (currentTheme.name === 'dark')
      setCurrentTheme({ ...base, ...light, name: 'light' });
  }
  let words: string[][] = [];
  const word = 'kissa';
  for (let i = 0; i < 6; i++) {
    const temp = [];
    for (let j = 0; j < word.length; j++) {
      temp.push('');
    }
    words.push(temp);
  }
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
  function getRandomColor(): string {
    const colors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  const blanks = new Array(5)
    .fill(1, 0, 5)
    .map((el, index) => (
      <L key={index} color={getRandomColor()} borderWidth={4} />
    ));

  return (
    <ThemeProvider theme={currentTheme}>
      <Div flexDirection="column" align="center" justify="space-between">
        <Global />
        <Appbar changeTheme={changeTheme} theme={currentTheme} />
        <Container>
          <Div maxHeight="450px" justify="center" flexDirection="column">
            <Div minHeight="50vh" flexDirection="column">
              <Proverb>
                Itku pitkästä ilosta, {blanks} pitkään nauramisesta.
              </Proverb>
              <Div justify="spaceAround" flexDirection="column">
                {words.map((word: string[], rowindex) => (
                  <Div key={`row-${rowindex}`} marginY=".15em" gap=".15em">
                    {word.map((letter: string, colindex) => (
                      <WordBox
                        key={`col-${colindex}-${letter}`}
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
