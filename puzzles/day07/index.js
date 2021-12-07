const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath, (input) => {
    return input.split(',').map((v) => parseInt(v, 10));
  });
  return inputData[0];
}

function solutionDay07Part1(inputs) {
  const totalFuelCosts = [];
  for (let i = 0; i < inputs.length; i += 1) {
    const selectedPosition = inputs[i];
    const fuelCostFromPosition = [];
    for (let j = 0; j < inputs.length; j += 1) {
      const carbPosition = inputs[j];
      const fuelSpent = Math.abs(carbPosition - selectedPosition);
      fuelCostFromPosition.push(fuelSpent);
    }
    totalFuelCosts.push(fuelCostFromPosition.reduce((sum, v) => sum + v, 0));
  }
  const minFuelSpent = Math.min.apply(null, totalFuelCosts);
  console.log('solutionDay07::part1', minFuelSpent);
  return minFuelSpent;
}

function solutionDay07Part2(inputs) {
  const getFuelSpent = (carbPosition, selectedPosition) => {
    if (carbPosition === selectedPosition) return 0;
    const diff = Math.abs(carbPosition - selectedPosition);
    return (diff * (diff + 1)) / 2;
  };
  const totalFuelCosts = [];
  const minPosition = Math.min.apply(null, inputs);
  const maxPosition = Math.max.apply(null, inputs);
  for (let i = minPosition; i <= maxPosition; i += 1) {
    const selectedPosition = i;
    const fuelCostFromPosition = [];
    for (let j = 0; j < inputs.length; j += 1) {
      const carbPosition = inputs[j];
      const fuelSpent = getFuelSpent(carbPosition, selectedPosition);
      fuelCostFromPosition.push(fuelSpent);
    }
    totalFuelCosts.push(fuelCostFromPosition.reduce((sum, v) => sum + v, 0));
  }
  const minFuelSpent = Math.min.apply(null, totalFuelCosts);
  console.log('solutionDay07::part2', minFuelSpent);
  return minFuelSpent;
}

async function solutionDay07(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay07Part1(inputData);
  const part2Solution = solutionDay07Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay07,
};
