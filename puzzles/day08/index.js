const path = require('path');
const { readInputByLine, getPermutations } = require('../../helpers/utils');

const DISPLAY_CODES = {
  abcefg: 0, // 6
  cf: 1, // 2
  acdeg: 2, // 5
  acdfg: 3, // 5
  bcdf: 4, // 4
  abdfg: 5, // 5
  abdefg: 6, // 6
  acf: 7, // 3
  abcdefg: 8, // 7
  abcdfg: 9, // 6
};

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath, (input) => {
    const patternData = input.split(' | ');
    const inputPatterns = patternData[0].split(' ');
    const outputPatterns = patternData[1].split(' ');
    return { input: inputPatterns, output: outputPatterns };
  });
  return inputData;
}

function solutionDay08Part1(inputs) {
  let uniqueOutputPatterns = 0;
  inputs.forEach((entry) => {
    const { output } = entry;
    output.forEach((pattern) => {
      const patternLength = pattern.length;
      if (
        patternLength === 2 ||
        patternLength === 3 ||
        patternLength === 4 ||
        patternLength === 7
      ) {
        uniqueOutputPatterns += 1;
      }
    });
  });
  console.log('solutionDay08::part1', uniqueOutputPatterns);
}

function solutionDay08Part2(inputs) {
  const screenSegments = 'abcdefg';
  const segmentPermutations = getPermutations(screenSegments);
  const getRewiredMap = (rewiredSegments) => {
    const map = {};
    for (let i = 0; i < rewiredSegments.length; i += 1) {
      map[rewiredSegments[i]] = screenSegments[i];
    }
    return map;
  };
  // final result
  let sum = 0;

  // for all input | output patterns
  for (let i = 0; i < inputs.length; i += 1) {
    const inputPatterns = inputs[i].input;
    const outputPatterns = inputs[i].output;
    // result of current entry
    let outputNumber = null;

    // brute force every rewiring combination
    for (let i = 0; i < segmentPermutations.length; i += 1) {
      const rewiredSegments = segmentPermutations[i];
      const mapping = getRewiredMap(rewiredSegments);
      let isValidSegmentPermutation = true;

      for (let i = 0; i < inputPatterns.length; i += 1) {
        const inputPattern = inputPatterns[i];
        const decodedPattern = inputPattern.split('').map((s) => mapping[s]);
        const decodedPatternStr = decodedPattern.sort().join('');
        const digit = DISPLAY_CODES[decodedPatternStr];
        // invalid segment permutation. all input patterns should be digits
        if (digit === undefined) {
          isValidSegmentPermutation = false;
        }
      }
      // all input patters yielded digits for current segment permutation
      // decode output patters for output number
      if (isValidSegmentPermutation) {
        const digits = outputPatterns.reduce((str, pattern) => {
          const decodedPattern = pattern.split('').map((s) => mapping[s]);
          const decodedPatternStr = decodedPattern.sort().join('');
          const digit = DISPLAY_CODES[decodedPatternStr];
          return str + digit;
        }, '');
        outputNumber = parseInt(digits, 10);
        // we've decoded the entry; move to next entry
        break;
      }
    }

    if (outputNumber !== null) {
      sum += outputNumber;
      outputNumber = null;
    }
  }
  console.log('solutionDay08::part2', sum);
  return sum;
}

async function solutionDay08(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay08Part1(inputData);
  const part2Solution = solutionDay08Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay08,
};
