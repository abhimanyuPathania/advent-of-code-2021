const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath, (initialState) => {
    return initialState.split(',').map((v) => parseInt(v, 10));
  });
  return inputData[0];
}

function simulateFishes(initialState, days, puzzleNo) {
  // fish can have timer value from 0 to 8
  const counts = Array.from({ length: 9 }).fill(0);
  // initialize counts with initial state
  initialState.forEach((timer) => {
    const currentCount = counts[timer];
    counts[timer] = currentCount + 1;
  });

  for (let i = 0; i < days; i += 1) {
    const newBornFish = counts[0];
    for (let j = 1; j < 9; j += 1) {
      counts[j - 1] = counts[j];
    }
    // fishes giving birth reset to "6" timer
    counts[6] = counts[6] + newBornFish;
    counts[8] = newBornFish;
  }

  const totalCount = counts.reduce((sum, v) => sum + v, 0);
  console.log(`solutionDay06::part${puzzleNo}`, totalCount);
  return totalCount;
}

async function solutionDay06(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = simulateFishes(inputData, 80, 1);
  const part2Solution = simulateFishes(inputData, 256, 2);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay06,
};
