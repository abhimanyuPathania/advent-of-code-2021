const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

const openingBrackets = {
  '(': ')',
  '{': '}',
  '[': ']',
  '<': '>',
};

const closingBrackets = {
  ')': '(',
  '}': '{',
  ']': '[',
  '>': '<',
};

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const autocompletePoints = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath, (row) => row.trim());
  return inputData;
}

function isLineCorrupted(line) {
  const stack = [];
  for (let i = 0; i < line.length; i += 1) {
    const currentSymbol = line[i];
    if (openingBrackets[currentSymbol]) {
      stack.push(currentSymbol);
    } else {
      const topSymbol = stack.pop();
      const correspondingOpeningBracket = closingBrackets[currentSymbol];
      // bracket mismatch
      if (topSymbol !== correspondingOpeningBracket) {
        return { corrupted: true, symbol: currentSymbol };
      }
    }
  }
  return { corrupted: false, openSymbols: stack };
}

function solutionDay10Part1(inputData) {
  const corruptingSymbols = [];
  for (let inputRow = 0; inputRow < inputData.length; inputRow += 1) {
    const line = inputData[inputRow];
    const { corrupted, symbol } = isLineCorrupted(line);
    if (corrupted) {
      corruptingSymbols.push(symbol);
    }
  }
  const syntaxErrorScore = corruptingSymbols.reduce(
    (sum, symbol) => sum + points[symbol],
    0,
  );
  console.log('solutionDay10::part1', syntaxErrorScore);
  return syntaxErrorScore;
}

function solutionDay10Part2(inputData) {
  const autoCompleteScores = [];

  for (let inputRow = 0; inputRow < inputData.length; inputRow += 1) {
    const line = inputData[inputRow];
    const { corrupted, openSymbols } = isLineCorrupted(line);

    if (corrupted) continue;

    const closingSymbols = [];
    openSymbols.forEach((symbol) =>
      closingSymbols.unshift(openingBrackets[symbol]),
    );
    const score = closingSymbols.reduce((s, symbol) => {
      return s * 5 + autocompletePoints[symbol];
    }, 0);
    autoCompleteScores.push(score);
  }

  autoCompleteScores.sort((a, b) => a - b);
  const middleScore =
    autoCompleteScores[Math.floor(autoCompleteScores.length / 2)];
  console.log('solutionDay10::part2', middleScore);
  return middleScore;
}

async function solutionDay10(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay10Part1(inputData);
  const part2Solution = solutionDay10Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay10,
};
