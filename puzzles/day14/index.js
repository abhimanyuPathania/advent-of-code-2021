const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath);
  const initialState = inputData[0].split('');
  const instructions = inputData.slice(2);
  const instructionsMap = {};
  instructions.forEach((instruction) => {
    instructionsMap[instruction.substring(0, 2)] =
      instruction[instruction.length - 1];
  });
  return { initialState, instructions: instructionsMap };
}

function executeInstructions(state, instructions) {
  for (let i = 0; i < state.length - 1; i += 1) {
    const key = state[i] + state[i + 1];
    const valueToInsert = instructions[key];

    if (!valueToInsert) continue;

    state.splice(i + 1, 0, valueToInsert);
    i += 1;
  }
  return state;
}

function solutionDay14Part1(inputData, steps) {
  const { initialState, instructions } = inputData;
  let state = [...initialState];

  for (let i = 0; i < steps; i += 1) {
    state = executeInstructions(state, instructions);
  }

  const counts = {};
  state.forEach((c) => {
    if (counts[c]) {
      counts[c] = counts[c] + 1;
    } else {
      counts[c] = 1;
    }
  });
  const countValues = Object.values(counts);
  const result = Math.max(...countValues) - Math.min(...countValues);
  console.log('solutionDay14::part1', result);
  return result;
}

// function solutionDay14Part2(inputData) {
//   console.log('solutionDay14::part1', inputData);
// }

async function solutionDay14(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay14Part1(inputData, 10);
  // const part2Solution = solutionDay14Part1(inputData, 40);
  return [part1Solution, undefined];
}

module.exports = {
  solutionDay14,
};
