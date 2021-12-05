const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData(filename) {
  const inputsFilePath = path.join(__dirname, filename);
  const inputData = await readInputByLine(inputsFilePath, (line) => {
    const regex = /^(\d+),(\d+) -> (\d+),(\d+)$/;
    const lineData = line.match(regex);
    const coordinates = lineData.slice(1, 5).map((v) => parseInt(v, 10));
    return [
      [coordinates[0], coordinates[1]],
      [coordinates[2], coordinates[3]],
    ];
  });
  /**
   * Array of line segments
   * Each line segment is an array of 2 coordinates
   * Each coordinate is an array of 2 integers [x, y]
   * [
   *   [[x1, y1], [x2, y2]],
   *   [[x3, y3], [x4, y4]],
   *   ...
   * ]
   */
  return inputData;
}

function getStraightLines(lines) {
  return lines.filter((line) => {
    const c1 = line[0];
    const c2 = line[1];
    const x1 = c1[0];
    const y1 = c1[1];
    const x2 = c2[0];
    const y2 = c2[1];
    return x1 === x2 || y1 === y2;
  });
}

function getDiagonalLines(lines) {
  return lines.filter((line) => {
    const c1 = line[0];
    const c2 = line[1];
    const x1 = c1[0];
    const y1 = c1[1];
    const x2 = c2[0];
    const y2 = c2[1];
    const slope = (y2 - y1) / (x2 - x1);
    return slope === 1 || slope === -1;
  });
}

function getCoordinateBoundries(lines) {
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  lines.forEach((line) => {
    const c1 = line[0];
    const c2 = line[1];
    const x1 = c1[0];
    const y1 = c1[1];
    const x2 = c2[0];
    const y2 = c2[1];
    minX = Math.min(minX, x1, x2);
    maxX = Math.max(maxX, x1, x2);
    minY = Math.min(minY, y1, y2);
    maxY = Math.max(maxY, y1, y2);
  });

  return { minX, maxX, minY, maxY };
}

function getCartesianPlane(boundries) {
  const plane = {};
  for (let x = boundries.minX; x <= boundries.maxX; x += 1) {
    plane[x] = {};
    for (let y = boundries.minY; y <= boundries.maxY; y += 1) {
      plane[x][y] = 0;
    }
  }
  /**
   * First key is the x coordinate
   * For each x coordinate the value is an object with keys
   *  corresponding to the y coordinate.
   * plane[x][y] is initialized to count (point touched by plotted lines)
   * {
   *  0: {0, 1, 2 ...},
   *  1: {0, 1, 2 ...},
   *  2: {0, 1, 2 ...},
   *  ...
   * }
   */
  return plane;
}

function plotStraightLineOnPlane(plane, line) {
  const c1 = line[0];
  const c2 = line[1];
  const x1 = c1[0];
  const y1 = c1[1];
  const x2 = c2[0];
  const y2 = c2[1];
  if (x1 === x2) {
    // vertical line
    const minYCoordinate = Math.min(y1, y2);
    const maxYCoordinate = Math.max(y1, y2);
    for (let y = minYCoordinate; y <= maxYCoordinate; y += 1) {
      plane[x1][y] = plane[x1][y] + 1;
    }
  } else {
    // horizontal line
    // y1 === y2 since we are only dealing with
    // straight lines at this point
    const minXCoordinate = Math.min(x1, x2);
    const maxXCoordinate = Math.max(x1, x2);
    for (let x = minXCoordinate; x <= maxXCoordinate; x += 1) {
      plane[x][y1] = plane[x][y1] + 1;
    }
  }
  return plane;
}

function plotDiagonalLineOnPlane(plane, line) {
  const c1 = line[0];
  const c2 = line[1];
  const x1 = c1[0];
  const y1 = c1[1];
  const x2 = c2[0];
  const y2 = c2[1];

  const minXCoordinate = Math.min(x1, x2);
  const maxXCoordinate = Math.max(x1, x2);
  const startingYCoordinate = minXCoordinate === x1 ? y1 : y2;
  const endingYCoordinate = startingYCoordinate === y1 ? y2 : y1;
  const yCoordinateUpdater = startingYCoordinate > endingYCoordinate ? -1 : 1;
  let currentYCoordinate = startingYCoordinate;

  for (let x = minXCoordinate; x <= maxXCoordinate; x += 1) {
    plane[x][currentYCoordinate] = plane[x][currentYCoordinate] + 1;
    // calculate next y coordinate
    currentYCoordinate = currentYCoordinate + yCoordinateUpdater;
  }
}

function getDangerousPoints(plane, boundries) {
  let dangerousPoints = 0;
  for (let x = boundries.minX; x <= boundries.maxX; x += 1) {
    for (let y = boundries.minY; y <= boundries.maxY; y += 1) {
      const pointVisitedCount = plane[x][y];
      if (pointVisitedCount >= 2) {
        dangerousPoints += 1;
      }
    }
  }
  return dangerousPoints;
}

function solutionDay05Part1(lines) {
  const straightLines = getStraightLines(lines);
  const boundries = getCoordinateBoundries(straightLines);
  const plane = getCartesianPlane(boundries);

  straightLines.forEach((line) => plotStraightLineOnPlane(plane, line));

  const dangerousPoints = getDangerousPoints(plane, boundries);
  console.log('solutionDay05::part1', dangerousPoints);
  return dangerousPoints;
}

function solutionDay05Part2(lines) {
  const straightLines = getStraightLines(lines);
  const diagonalLines = getDiagonalLines(lines);
  const filteredLines = [...straightLines, ...diagonalLines];
  const boundries = getCoordinateBoundries(filteredLines);
  const plane = getCartesianPlane(boundries);

  straightLines.forEach((line) => plotStraightLineOnPlane(plane, line));
  diagonalLines.forEach((line) => plotDiagonalLineOnPlane(plane, line));

  const dangerousPoints = getDangerousPoints(plane, boundries);
  console.log('solutionDay05::part2', dangerousPoints);
  return dangerousPoints;
}

async function solutionDay05(filename) {
  const inputData = await getInputData(filename);
  const part1Solution = solutionDay05Part1(inputData);
  const part2Solution = solutionDay05Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay05,
};
