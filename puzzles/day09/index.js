const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath, (row) => {
    return row.split('').map((v) => parseInt(v, 10));
  });
  return inputData;
}

function solutionDay09Part1(inputData) {
  const rowCount = inputData.length;
  const columnCount = inputData[0].length;
  const lowPoints = [];

  for (let row = 0; row < rowCount; row += 1) {
    for (let column = 0; column < columnCount; column += 1) {
      const current = inputData[row][column];
      let locals = [
        // left
        inputData[row] !== undefined ? inputData[row][column - 1] : undefined,
        // right
        inputData[row] !== undefined ? inputData[row][column + 1] : undefined,
        // top
        inputData[row - 1] !== undefined
          ? inputData[row - 1][column]
          : undefined,
        // bottom
        inputData[row + 1] !== undefined
          ? inputData[row + 1][column]
          : undefined,
      ].filter((v) => v !== undefined);
      const minLocal = Math.min(...locals);
      if (current < minLocal) lowPoints.push(current);
    }
  }

  const risk = lowPoints.reduce((sum, v) => sum + (v + 1), 0);
  console.log('solutionDay09::part1', risk);
  return risk;
}

function getLocalMinimas(inputData) {
  const rowCount = inputData.length;
  const columnCount = inputData[0].length;
  const minimas = [];
  for (let row = 0; row < rowCount; row += 1) {
    for (let column = 0; column < columnCount; column += 1) {
      const current = inputData[row][column];
      let locals = [
        // left
        inputData[row] !== undefined ? inputData[row][column - 1] : undefined,
        // right
        inputData[row] !== undefined ? inputData[row][column + 1] : undefined,
        // top
        inputData[row - 1] !== undefined
          ? inputData[row - 1][column]
          : undefined,
        // bottom
        inputData[row + 1] !== undefined
          ? inputData[row + 1][column]
          : undefined,
      ].filter((v) => v !== undefined);
      const minLocal = Math.min(...locals);

      if (current < minLocal) {
        minimas.push(`${row},${column}`);
      }
    }
  }
  return minimas;
}

function getValueFromKey(key, inputData) {
  if (!inputData) throw new Error('inputData not found');

  const keyArr = key.split(',');
  const row = keyArr[0];
  const col = keyArr[1];
  const value = inputData[row] !== undefined ? inputData[row][col] : undefined;
  return value;
}

function getAdjacentKeys(key) {
  const keyArr = key.split(',').map((v) => parseInt(v, 10));
  const row = keyArr[0];
  const col = keyArr[1];
  return [
    `${row},${col - 1}`,
    `${row},${col + 1}`,
    `${row - 1},${col}`,
    `${row + 1},${col}`,
  ];
}

function getAdjacentMinimas(inputData, targetKey) {
  if (!inputData) throw new Error('inputData not found');

  const minima = getValueFromKey(targetKey, inputData);
  const adjacentKeys = getAdjacentKeys(targetKey);
  const validBasinMembers = adjacentKeys.filter((key) => {
    const value = getValueFromKey(key, inputData);
    return value !== undefined && value < 9 && value > minima;
  });
  return validBasinMembers;
}

function solutionDay09Part2(inputData) {
  const localMinimas = getLocalMinimas(inputData);

  const getLocalMinimaBasin = (minimaKey) => {
    const basinMembers = { [minimaKey]: localMinimas[minimaKey] };
    // starting point of basin will be the local minima
    const basinMembersToCheck = [minimaKey];

    while (basinMembersToCheck.length > 0) {
      const pointKey = basinMembersToCheck.pop();
      // list of points that satisfy basin member conditions
      const adjacentPoints = getAdjacentMinimas(inputData, pointKey);
      adjacentPoints.forEach((key) => {
        // add point if not already present in basin
        if (basinMembers[key] === undefined) {
          basinMembers[key] = getValueFromKey(key, inputData);
          // also check the same point for more adjacent basin members
          basinMembersToCheck.push(key);
        }
      });
    }

    return basinMembers;
  };

  const basinLengths = localMinimas
    .map((minimaKey) => {
      const basin = getLocalMinimaBasin(minimaKey);
      return Object.keys(basin).length;
    })
    .sort((a, b) => a - b);
  const basinLengthsTop3 = basinLengths.slice(basinLengths.length - 3);
  const result = basinLengthsTop3.reduce((product, v) => v * product, 1);
  console.log('solutionDay09::part2', result);
  return result;
}

async function solutionDay09(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay09Part1(inputData);
  const part2Solution = solutionDay09Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay09,
};
