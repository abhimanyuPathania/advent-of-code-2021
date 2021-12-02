const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function solutionDay01() {
  const inputsFilePath = path.join(__dirname, './input.txt');
  const inputData = await readInputByLine(inputsFilePath, (v) =>
    parseInt(v, 10),
  );
  let result = 0;
  for (let i = 1; i < inputData.length; i += 1) {
    if (inputData[i] > inputData[i - 1]) {
      result += 1;
    }
  }
  console.log('solutionDay01::result', result);
}

module.exports = {
  solutionDay01,
};
// some com
