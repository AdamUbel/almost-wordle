import React, { useContext } from "react";

import { AppContext } from "../App";

const Key = ({ keyVal }) => {
  const {
    grid,
    setGrid,
    gridColor,
    setGridColor,
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
  } = useContext(AppContext);

  const { selectedRow, selectedLetter } = currPosition;

  const getGridColor = (word, guess, letterPos) => {
    // correct (matched) index letter
    console.log(word, guess);
    if (guess[letterPos] === word[letterPos]) {
      return "correct";
    }

    let wrongWord = 0;
    let wrongGuess = 0;
    for (let i = 0; i < word.length; i++) {
      // count the wrong (unmatched) letters
      if (word[i] === guess[letterPos] && guess[i] !== guess[letterPos]) {
        wrongWord++;
      }
      if (i <= letterPos) {
        if (guess[i] === guess[letterPos] && word[i] !== guess[letterPos]) {
          wrongGuess++;
        }
      }

      // an unmatched guess letter is wrong if it pairs with
      // an unmatched word letter
      if (i >= letterPos) {
        if (wrongGuess === 0) {
          break;
        }
        if (wrongGuess <= wrongWord) {
          return "contains";
        }
      }
    }

    // otherwise not any
    return "used";
  };

  const registerKey = async () => {
    const newGrid = [...grid];
    const newGridColor = [...gridColor];
    const newUsed = [...usedKeys];
    const newCorrect = [...correctKeys];
    const newContains = [...containsKeys];
    const newAttempt = [...guesses];
    let newGuess = guessedWord;
    // register enter
    if (keyVal === "ENTER") {
      if (guessedWord.length === 5 && !wordBankSet.has(guessedWord)) {
        return alert("Un-Known Word Entered");
      }

      if (selectedLetter === 5) {
        newAttempt.push(guessedWord.toUpperCase());
        for (let i = 0; i < 5; i++) {
          let enteredLetter = grid[selectedRow][i];
          if (!usedKeys.includes(enteredLetter)) {
            newUsed.push(enteredLetter);
          }
          if (theWord.word.includes(enteredLetter) && !containsKeys.includes(enteredLetter)) {
            newContains.push(enteredLetter);
          }
          if (theWord.wordInfo[i] === enteredLetter && !correctKeys.includes(enteredLetter)) {
            newCorrect.push(enteredLetter);
          }
          newGridColor[selectedRow][i] = getGridColor(theWord.word, newAttempt[selectedRow], i);
        }
        setGridColor(newGridColor);
        setUsedKeys(newUsed);
        setContainsKeys(newContains);
        setCorrectKeys(newCorrect);
        setGuesses(newAttempt);
        setGuessedWord("");
        setCurrPosition({ selectedRow: selectedRow + 1, selectedLetter: 0 });
      }
      return;
    }
    // register delete
    else if (keyVal === "DEL") {
      if (selectedLetter > 0) {
        newGrid[selectedRow][selectedLetter - 1] = "";
        setGrid(newGrid);

        newGuess = newGuess.slice(0, newGuess.length - 1);
        setGuessedWord(newGuess);

        setCurrPosition({ ...currPosition, selectedLetter: selectedLetter - 1 });
      }
    }
    // register letters
    else if (selectedLetter < 5) {
      newGrid[selectedRow][selectedLetter] = keyVal;
      setGrid(newGrid);

      newGuess += keyVal.toLowerCase();
      setGuessedWord(newGuess);

      setCurrPosition({ ...currPosition, selectedLetter: selectedLetter + 1 });
    }
  };

  return (
    <div
      className={
        keyVal.length > 1
          ? "key big"
          : correctKeys.includes(keyVal)
          ? "key correct"
          : containsKeys.includes(keyVal)
          ? "key contains"
          : usedKeys.includes(keyVal)
          ? "key used"
          : "key"
      }
      onClick={registerKey}
    >
      {keyVal}
    </div>
  );
};

export default Key;
