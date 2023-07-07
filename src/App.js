import "./App.css";
import { createContext, useState, useEffect } from "react";

import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import { gridDefault, makeWordSet, getRandomWord, gridColorDefault } from "./Words";

export const AppContext = createContext();

function App() {
  // State variables
  const [grid, setGrid] = useState(gridDefault); // Grid state
  const [gridColor, setGridColor] = useState(gridColorDefault); // Grid color state
  const [currPosition, setCurrPosition] = useState({ selectedRow: 0, selectedLetter: 0 }); // Current position state
  const [usedKeys, setUsedKeys] = useState([]); // Used keys state
  const [correctKeys, setCorrectKeys] = useState([]); // Correctly guessed keys state
  const [containsKeys, setContainsKeys] = useState([]); // Keys contained in the word state
  const [wordBankSet, setWordBankSet] = useState(new Set()); // Set of words in the word bank state
  const [theWord, setTheWord] = useState("WORDS"); // The target word state
  const [guessedWord, setGuessedWord] = useState(""); // The currently guessed word state
  const [guesses, setGuesses] = useState([]); // List of previous guesses state

  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    // Effect to initialize the word set and select a random word when the selected row is 0
    if (currPosition.selectedRow === 0) {
      makeWordSet().then((words) => {
        setWordBankSet(words.wordSet);
        getRandomWord(words.wordSet).then((word) => {
          setTheWord(word);
        });
      });
    }

    // Effect to show the outcome modal when all keys are correct or the selected row exceeds 5
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
          <Grid /> {/* Renders the Grid component */}
          <Keyboard /> {/* Renders the Keyboard component */}
        </div>

        {/* Outcome modal */}
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
