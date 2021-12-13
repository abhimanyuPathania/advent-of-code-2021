const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath);
  const marker = inputData.indexOf('');
  const coordinates = inputData
    .slice(0, marker)
    .map((c) => c.split(',').map((v) => parseInt(v, 10)));
  const folds = inputData.slice(marker + 1);
  const regex = /^fold along (x|y)=(\d+)$/;
  const parsedFolds = folds.map((fold) => {
    const foldData = fold.match(regex);
    return { axis: foldData[1], value: parseInt(foldData[2]) };
  });
  return [coordinates, parsedFolds];
}

function printCoordinates(inputData, maxX, maxY) {
  const coordinateMap = {};

  inputData.forEach((c) => (coordinateMap[c.join(',')] = c));

  let output = '';
  for (let y = 0; y <= maxY; y += 1) {
    for (let x = 0; x <= maxX; x += 1) {
      const key = `${x},${y}`;
      if (coordinateMap[key]) {
        output += '# ';
      } else {
        output += '. ';
      }
    }
    output += '\n';
  }
  console.log(output);
}

function foldGrid(inputData, foldData) {
  const { axis, value: foldValue } = foldData;
  const coordinatesThatStay = [];
  const coordinatesToShift = [];

  inputData.forEach((coordinate) => {
    const c = axis === 'x' ? coordinate[0] : coordinate[1];
    if (c > foldValue) {
      coordinatesToShift.push(coordinate);
    } else {
      coordinatesThatStay.push(coordinate);
    }
  });

  const shiftedCoordinates = coordinatesToShift.map((coordinate) => {
    let x = coordinate[0];
    let y = coordinate[1];
    if (axis === 'x') {
      x = 2 * foldValue - x;
    } else {
      y = 2 * foldValue - y;
    }
    return [x, y];
  });

  // remove duplicate/overlapping coordinates
  const coordinatesAfterFolding = Array.from(
    new Set(
      [...coordinatesThatStay, ...shiftedCoordinates].map((c) => c.join(',')),
    ),
  ).map((c) => c.split(',').map((v) => parseInt(v, 10)));
  return coordinatesAfterFolding;
}

function solutionDay13Part1(inputData) {
  const inputCoordinates = inputData[0];
  const folds = inputData[1];
  const outputCoordinates = foldGrid(inputCoordinates, folds[0]);
  console.log('solutionDay13::part1', outputCoordinates.length);
  return outputCoordinates.length;
}

function solutionDay13Part2(inputData, printCode = false) {
  const inputCoordinates = inputData[0];
  const folds = inputData[1];
  const outputCoordinates = folds.reduce(
    (currentOutputCoordinates, fold) =>
      foldGrid(currentOutputCoordinates, fold),
    inputCoordinates,
  );
  const maxX = Math.max(...outputCoordinates.map((c) => c[0]));
  const maxY = Math.max(...outputCoordinates.map((c) => c[1]));
  console.log('solutionDay13::part2', outputCoordinates.length);
  if (printCode) printCoordinates(outputCoordinates, maxX, maxY);
  return outputCoordinates.length;
}

async function solutionDay13(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay13Part1(inputData);
  const part2Solution = solutionDay13Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay13,
};
