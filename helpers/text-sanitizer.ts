const removeMultiSpace = (word: string): string => {
  let currentChar = "";
  let returnWord = "";
  for (let char of word) {
    if (currentChar === " " && char === " ") {
      continue;
    } else {
      currentChar = char;
      returnWord += char;
    }
  }
  return returnWord.trim();
};

const capitalizeWord = (word: string): string => {
  return word.toUpperCase();
};
const replaceSlashWith_ = (word: string): string => {
  return word.replace("/", "_");
};

export const textSanitizer = (word: string): string => {
  return replaceSlashWith_(capitalizeWord(removeMultiSpace(word)));
};
