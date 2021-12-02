const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function solutionDay01() {
  const inputsFilePath = path.join(__dirname, './input.txt');
  const inputData = await readInputByLine(inputsFilePath, (v) =>
    parseInt(v, 10),
  );
  const doesIncrement = (arrData) => {
    let result = 0;
    for (let i = 1; i < arrData.length; i += 1) {
      if (arrData[i] > arrData[i - 1]) {
        result += 1;
      }
    }
    return result;
  };

  const resultPart1 = doesIncrement(inputData);
  console.log('solutionDay01::part1', resultPart1);

  // Part 2
  const threeSums = [];
  for (let i = 0; i < inputData.length - 2; i += 1) {
    threeSums.push(inputData[i] + inputData[i + 1] + inputData[i + 2]);
  }

  const resultPart2 = doesIncrement(threeSums);
  console.log('solutionDay01::part2', resultPart2);

  return [resultPart1, resultPart2];
}

module.exports = {
  solutionDay01,
};
