import "./App.css";
import { createContext, useState, useEffect } from "react";

import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import { gridDefault, makeWordSet, getRandomWord, gridColorDefault } from "./Words";

export const AppContext = createContext();

function App() {
  const [grid, setGrid] = useState(gridDefault);
  const [gridColor, setGridColor] = useState(gridColorDefault);
  const [currPosition, setCurrPosition] = useState({ selectedRow: 0, selectedLetter: 0 });
  const [usedKeys, setUsedKeys] = useState([]);
  const [correctKeys, setCorrectKeys] = useState([]);
  const [containsKeys, setContainsKeys] = useState([]);
  const [wordBankSet, setWordBankSet] = useState(new Set());
  const [theWord, setTheWord] = useState("WORDS");
  const [guessedWord, setGuessedWord] = useState("");
  const [guesses, setGuesses] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currPosition.selectedRow === 0) {
      makeWordSet().then((words) => {
        setWordBankSet(words.wordSet);
        getRandomWord(words.wordSet).then((word) => {
          setTheWord(word);
        });
      });
    }

    if (correctKeys.length === 5 || currPosition.selectedRow > 5) {
      setShowModal(true);
    }
  }, [correctKeys, currPosition.selectedRow]);

  return (
    <div className="App">
      <nav>
        <h1>Almost-Wordle</h1>
      </nav>

      <AppContext.Provider
        value={{
          grid,
          setGrid,
          currPosition,
          setCurrPosition,
          theWord,
          wordBankSet,
          usedKeys,
          setUsedKeys,
          correctKeys,
          setCorrectKeys,
          containsKeys,
          setContainsKeys,
          guessedWord,
          setGuessedWord,
          guesses,
          setGuesses,
          gridColor,
          setGridColor,
        }}
      >
        <div className={showModal ? "game-container blurred" : "game-container"}>
          <Grid />
          <Keyboard />
        </div>

        {/* Outcome modal  NOTE */}
        <div className={showModal ? "modal" : "hidden"}>
          <h1>Results</h1>
          <h2>
            You {correctKeys.length < 5 ? "Lost" : "Won"} in {currPosition.selectedRow} Attempt{"(s)"}.
          </h2>
          <a href="/" className="again">
            Try Again
          </a>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
