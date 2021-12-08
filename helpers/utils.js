const { readFile } = require('fs/promises');

async function readInputByLine(inputFilePath, parseInput) {
  try {
    const data = await readFile(inputFilePath, 'utf8');
    let dataArr = data.split('\n');

    if (parseInput && typeof parseInput === 'function') {
      dataArr = dataArr.map((v) => parseInput(v));
    }
    return dataArr;
  } catch (err) {
    console.error('readInputByLine::', err);
  }
}

function getPermutations(string) {
  const permutations = [];
  const stringLength = string.length;

  if (stringLength === 0) return [];

  if (stringLength === 1) return [string];

  for (let i = 0; i < stringLength; i += 1) {
    const char = string[i];
    const remainingString =
      string.slice(0, i) + string.slice(i + 1, stringLength);
    const permuationsOfRemainingString = getPermutations(remainingString);

    for (let j = 0; j < permuationsOfRemainingString.length; j += 1) {
      permutations.push(char + permuationsOfRemainingString[j]);
    }
  }
  return permutations;
}

module.exports = {
  readInputByLine,
  getPermutations,
};
