const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData() {
  const inputsFilePath = path.join(__dirname, './input.txt');
  const inputData = await readInputByLine(inputsFilePath, (cmd) => {
    const cmdRegex = /^(forward|up|down) (\d+)$/;
    const cmdParsed = cmd.match(cmdRegex);
    return [cmdParsed[1], parseInt(cmdParsed[2])];
  });
  return inputData;
}

function solutionDay02Part1(inputData) {
  let horizontal = 0;
  let vertical = 0;
  for (let i = 0; i < inputData.length; i += 1) {
    const cmd = inputData[i][0];
    const value = inputData[i][1];

    switch (cmd) {
      case 'forward':
        horizontal += value;
        break;
      case 'up':
        vertical -= value;
        break;
      case 'down':
        vertical += value;
        break;
      default:
        break;
    }
  }

  console.log('solutionDay02::part1', horizontal * vertical);
  return horizontal * vertical;
}

function solutionDay02Part2(inputData) {
  let horizontal = 0;
  let vertical = 0;
  let aim = 0;
  for (let i = 0; i < inputData.length; i += 1) {
    const cmd = inputData[i][0];
    const value = inputData[i][1];

    switch (cmd) {
      case 'forward':
        horizontal += value;
        vertical += aim * value;
        break;
      case 'up':
        aim -= value;
        break;
      case 'down':
        aim += value;
        break;
      default:
        break;
    }
  }

  console.log('solutionDay02::part2', horizontal * vertical);
  return horizontal * vertical;
}

async function solutionDay02() {
  const inputData = await getInputData();
  const part1Solution = solutionDay02Part1(inputData);
  const part2Solution = solutionDay02Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay02,
};
