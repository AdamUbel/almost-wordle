import WordBank from "./word-bank.txt";

export const gridDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const gridColorDefault = [
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
  ["def", "def", "def", "def", "def"],
];

export const makeWordSet = async () => {
  let wordSet;
  await fetch(WordBank)
    .then((res) => res.text())
    .then((result) => {
      const wordArr = result.split("\r\n");
      wordSet = new Set(wordArr);
    });

  return { wordSet };
};

export const getRandomWord = async (wordBankSet) => {
  const randomWord = await [...wordBankSet][Math.floor(Math.random() * wordBankSet.size)];
  const letterCount = await getWordDeatils([...randomWord.toUpperCase()]);
  return { word: randomWord.toUpperCase(), letterCount, wordInfo: [...randomWord.toUpperCase()] };
};

const getWordDeatils = (wordArr) => {
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
