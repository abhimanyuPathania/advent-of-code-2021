const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath, (initialState) => {
    return initialState.split(',').map((v) => parseInt(v, 10));
  });
  return inputData[0];
}

function solutionDay06Worker(inputData, days) {
  const initialState = [...inputData];
  let simulatedState = initialState;
  for (let i = 0; i < days; i += 1) {
    console.log(`day-${i} :: ${simulatedState.length}`);
    let newFishBornForTheDay = 0;
    for (let j = 0; j < simulatedState.length; j += 1) {
      const internalTime = simulatedState[j];
      if (internalTime > 0) {
        simulatedState[j] = internalTime - 1;
      } else {
        simulatedState[j] = 6;
        newFishBornForTheDay += 1;
      }
    }

    for (let i = 1; i <= newFishBornForTheDay; i += 1) {
      simulatedState.push(8);
    }
  }
  const finalNumberOfFish = simulatedState.length;
  console.log('solutionDay06::part1', finalNumberOfFish);
  return finalNumberOfFish;
}

async function solutionDay06(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay06Worker(inputData, 80);
  // const part1Solution = solutionDay06Worker([6], 256);
  // const part2Solution = solutionDay06Worker(inputData, 256);
  return [part1Solution, undefined];
}

module.exports = {
  solutionDay06,
};
