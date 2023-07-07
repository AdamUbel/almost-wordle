import WordBank from "./word-bank.txt";

// Grid default state
export const gridDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

// Grid color default state
export const gridColorDefault = [
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
];

// Function to make a word set from the WordBank file
export const makeWordSet = async () => {
  let wordSet;
  await fetch(WordBank)
    .then((res) => res.text())
    .then((result) => {
      const wordArr = result.split(/\r?\n/);
      wordSet = new Set(wordArr);
    });

  return { wordSet };
};

// Function to get a random word from the word bank set
export const getRandomWord = async (wordBankSet) => {
  const randomWord = await [...wordBankSet][Math.floor(Math.random() * wordBankSet.size)];
  const letterCount = await getWordDetails([...randomWord.toUpperCase()]);
  return { word: randomWord.toUpperCase(), letterCount, wordInfo: [...randomWord.toUpperCase()] };
};

// Function to get the letter count details of a word
const getWordDetails = (wordArr) => {
  const wordDetails = {};
  for (let i = 0; i < wordArr.length; i++) {
    if (wordDetails.hasOwnProperty(wordArr[i])) {
      wordDetails[wordArr[i]] = wordDetails[wordArr[i]] + 1;
    } else {
      wordDetails[wordArr[i]] = 1;
    }
  }
  return wordDetails;
};
