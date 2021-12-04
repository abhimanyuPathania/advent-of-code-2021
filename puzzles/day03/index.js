const path = require('path');
const { readInputByLine } = require('../../helpers/utils');

async function getInputData() {
  const inputsFilePath = path.join(__dirname, './input.txt');
  const inputData = await readInputByLine(inputsFilePath, (binaryNo) => {
    return binaryNo.split('').map((bit) => parseInt(bit, 10));
  });
  return inputData;
}

function solutionDay03Part1(inputData) {
  const binaryNoLength = inputData[0].length;
  /**
   * each inner array holds counts of '0' and '1' for each column in input data
   * [[n0, n1], [n0, n1], [n0, n1]...]
   */
  const countingArr = Array.from({ length: binaryNoLength }).map(() => [0, 0]);

  inputData.forEach((binaryNo) => {
    binaryNo.forEach((bit, col) => {
      if (bit === 0) {
        countingArr[col][0] += 1;
      } else {
        countingArr[col][1] += 1;
      }
    });
  });

  const gammaRate = [];
  const epsilonRate = [];

  countingArr.forEach((colBitCount) => {
    if (colBitCount[0] > colBitCount[1]) {
      gammaRate.push(0);
      epsilonRate.push(1);
    } else {
      gammaRate.push(1);
      epsilonRate.push(0);
    }
  });

  const gammaRateDec = parseInt(gammaRate.join(''), 2);
  const epsilonRateDec = parseInt(epsilonRate.join(''), 2);

  const powerConsumption = gammaRateDec * epsilonRateDec;
  console.log('solutionDay03::part1', powerConsumption);
  return powerConsumption;
}

function solutionDay03Part2(inputData) {
  const binaryNoLength = inputData[0].length;
  /**
   * rating: o2 (bit 1 are more)
   * rating: co2 (bit 1 are more)
   */
  const filterBitData = (bitArrData, colIndex, rating) => {
    const filteredBit0 = [];
    const filteredBit1 = [];

    bitArrData.forEach((binaryNo) => {
      if (binaryNo[colIndex] === 0) {
        filteredBit0.push(binaryNo);
      } else {
        filteredBit1.push(binaryNo);
      }
    });

    let filterBitDataResult;
    if (rating === 'o2') {
      if (filteredBit1.length >= filteredBit0.length) {
        filterBitDataResult = filteredBit1;
      } else {
        filterBitDataResult = filteredBit0;
      }
    }

    if (rating === 'co2') {
      if (filteredBit0.length <= filteredBit1.length) {
        filterBitDataResult = filteredBit0;
      } else {
        filterBitDataResult = filteredBit1;
      }
    }
    return filterBitDataResult;
  };

  const getRating = (initialData, rating) => {
    let ratingResult = initialData;
    let i = 0;
    while (i < binaryNoLength && ratingResult.length > 1) {
      ratingResult = filterBitData(ratingResult, i, rating);
      i += 1;
    }
    return ratingResult;
  };

  const o2RatingArr = getRating(inputData, 'o2');
  const co2RatingArr = getRating(inputData, 'co2');
  const o2Rating = parseInt(o2RatingArr[0].join(''), 2);
  const co2Rating = parseInt(co2RatingArr[0].join(''), 2);
  const lifeSupportRating = o2Rating * co2Rating;
  console.log('solutionDay03::part2', lifeSupportRating);
  return lifeSupportRating;
}

async function solutionDay03() {
  const inputData = await getInputData();
  const part1Solution = solutionDay03Part1(inputData);
  const part2Solution = solutionDay03Part2(inputData);
  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay03,
};
