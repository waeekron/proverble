import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import isEqual from 'lodash/isEqual';
import WordBox from './components/WordBox/WordBox';
import Appbar from './components/Appbar/Appbar';
import Global from './styles/global';
import KeyBoard from './components/KeyBoard/KeyBoard';
import { Letter } from './types';
import { base, light } from './styles/themes';
import { Div, Container, Proverb, L } from './styles/styled';
import { isAllowedKey } from './utils/utils';
import Orientation from './components/Orientation';
import proverbService from './services/proverb';

function App() {
  const [wordToGuess, setWordToGuess] = useState('');
  const [proverb, setProverb] = useState('');
  const [currentTheme, setCurrentTheme] = useState(() => ({
    ...base,
    ...light,
    name: 'light'
  }));
  const [guess, setGuess] = useState<string>(() => '');
  const [row, setRow] = useState(() => 0);
  const [guesses, setGuesses] = useState<
    (string | { index: number; char: string; value: number })[][]
  >([[]]);
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

    setGuessedLetters(newGuessedLetters);
    if (guessIsRight) setRow(-1);
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (!isAllowedKey(e.key) || row === -1) return;
    const newState = [...guesses];
    if (e.key === 'Backspace') {
      setGuess(guess.slice(0, -1));
      newState[row][guess.length - 1] = '';
      return;
    }
    if (e.key === 'Enter' && guess.length === wordToGuess.length) {
      check(guess, wordToGuess);
      return;
    }
    if (e.key !== 'Enter' && guess.length < guesses[0].length) {
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

  useEffect(() => {
    (async () => {
      const { content } = await proverbService.getToday();
      const c = content.split(' ');
      const wordToGuess = c[Math.floor(c.length / 2)];
      setWordToGuess(wordToGuess);
      setProverb(content);
      setGuesses(() => {
        let words: string[][] = [];
        for (let i = 0; i < wordToGuess.length; i++) {
          const temp = [];
          for (let j = 0; j < wordToGuess.length; j++) {
            temp.push('');
          }
          words.push(temp);
        }

        return words;
      });
    })();
  }, []);

  const blanks = useMemo(() => {
    return new Array(wordToGuess.length)
      .fill(1, 0, wordToGuess.length)
      .map((_, index) => {
        return (
          <L key={index} borderWidth={2}>
            {row === -1 ? wordToGuess[index] : ''}
          </L>
        );
      });
  }, [row, wordToGuess]);

  const hint = useMemo(() => {
    const p = proverb.split(' ');
    const start = p.slice(0, Math.floor(p.length / 2)).join(' ');
    const end = p.slice(Math.floor(p.length / 2) + 1, p.length).join(' ');
    return [start, end];
  }, [proverb]);
  return (
    <ThemeProvider theme={currentTheme}>
      <Div flexDirection="column" align="center" justify="space-between">
        <Global />
        <Appbar setCurrentTheme={setCurrentTheme} currentTheme={currentTheme} />
        <Orientation>
          <Container>
            <Div maxHeight="450px" justify="center" flexDirection="column">
              <Div minHeight="50vh" flexDirection="column">
                <Proverb>
                  {hint[0] + ' '}
                  {blanks}
                  {' ' + hint[1]}
                </Proverb>
                <Div justify="spaceAround" flexDirection="column">
                  {guesses.map((word, rowindex) => (
                    <Div key={`row-${rowindex}`} marginY=".15em" gap=".15em">
                      {word.map((letter, colindex) => (
                        <WordBox
                          key={`col-${colindex}-${letter}`}
                          currentrow={row}
                          rowindex={rowindex}
                          colindex={colindex}
                          guesses={guesses}
                        />
                      ))}
                    </Div>
                  ))}
                </Div>
              </Div>
            </Div>
            <KeyBoard
              guessedLetters={guessedLetters}
              handleKeyPress={handleKeyPress}
            />
          </Container>
        </Orientation>
      </Div>
    </ThemeProvider>
  );
}

export default App;
