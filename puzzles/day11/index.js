const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath, (row) =>
    row.split('').map((v) => parseInt(v, 10)),
  );
  return inputData;
}

// function log(inputData) {
//   for (let row = 0; row < inputData.length; row += 1) {
//     console.log(inputData[row].join(' '));
//   }
//   console.log('\n');
// }

// mutates arrays
function incrementLevels(inputData) {
  const toFlash = new Set();
  for (let row = 0; row < inputData.length; row += 1) {
    for (let col = 0; col < inputData.length; col += 1) {
      const value = inputData[row][col];
      if (value === 9) {
        // record items that are going to flash after increments
        toFlash.add(`${row},${col}`);
        // set level to 0
        inputData[row][col] = 0;
      } else {
        inputData[row][col] = value + 1;
      }
    }
  }
  return toFlash;
}

function getAdjacentCoordinates(inputData, coordinate) {
  const maxRow = inputData.length;
  const maxCol = inputData[0].length;
  const row = coordinate[0];
  const col = coordinate[1];
  const adjCoords = [
    // left
    [row, col - 1],
    // right
    [row, col + 1],
    // top
    [row - 1, col],
    // bottom
    [row + 1, col],
    // top left
    [row - 1, col - 1],
    // top right
    [row - 1, col + 1],
    // bottom left
    [row + 1, col - 1],
    // bottom right
    [row + 1, col + 1],
  ];
  return adjCoords.filter((c) => {
    const row = c[0];
    const col = c[1];
    return row >= 0 && row < maxRow && col >= 0 && col < maxCol;
  });
}

function simulateFlashes(inputData) {
  const toFlash = incrementLevels(inputData);

  if (toFlash.size === 0) return 0;

  for (const coordinate of toFlash) {
    const coordinateArr = coordinate.split(',').map((v) => parseInt(v, 10));
    const adjacentCoordinates = getAdjacentCoordinates(
      inputData,
      coordinateArr,
    );
    adjacentCoordinates.forEach((c) => {
      const row = c[0];
      const col = c[1];
      const value = inputData[row][col];
      // already flashed; ignore
      if (value === 0) return;
      else if (value === 9) {
        inputData[row][col] = 0;
        // adding to set takes cares of duplicates
        toFlash.add(c.join(','));
      } else {
        inputData[row][col] = value + 1;
      }
    });
  }

  const flashCount = toFlash.size;
  return flashCount;
}

function solutionDay11Part1(inputData, steps) {
  const inputDataCopy = JSON.parse(JSON.stringify(inputData));
  let totalFlashCount = 0;
  for (let s = 0; s < steps; s += 1) {
    const count = simulateFlashes(inputDataCopy);
    totalFlashCount += count;
  }
  console.log('solutionDay11::part1', totalFlashCount);
  return totalFlashCount;
}

function solutionDay11Part2(inputData) {
  const inputDataCopy = JSON.parse(JSON.stringify(inputData));
  const maxRow = inputDataCopy.length;
  const maxCol = inputDataCopy[0].length;
  const items = maxRow * maxCol;
  let step = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    step += 1;
    const count = simulateFlashes(inputDataCopy);
    if (count === items) break;
  }
  console.log('solutionDay11::part2', step);
  return step;
}

async function solutionDay11(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay11Part1(inputData, 100);
  const part2Solution = solutionDay11Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay11,
};
