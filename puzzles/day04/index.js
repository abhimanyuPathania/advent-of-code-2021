const path = require('path');

const { readInputByLine } = require('../../helpers/utils');
const constants = require('./constants');

async function getInputData() {
  const inputsFilePath = path.join(__dirname, './input.txt');
  const inputData = await readInputByLine(inputsFilePath);
  const inputDataSanitized = inputData
    .filter((v) => v)
    .map((v) => {
      return v
        .split(' ')
        .filter((v) => v)
        .map((v) => parseInt(v, 10));
    });
  let inputDataParsed = [];
  for (let i = 0; i < inputDataSanitized.length; i += constants.BOARD_ROWS) {
    const board = inputDataSanitized.slice(i, i + constants.BOARD_ROWS);
    inputDataParsed.push(board);
  }
  /**
   * * Parsed data - Array of 'boards'
   * [
   * *  Board - Array of board rows
   *  [
   *    [1,32, 12, 12, 4],
   *    [1,32, 12, 12, 4],
   *    ... (3 more rows)
   *  ]
   * ]
   */
  return inputDataParsed;
}

function markAndCheckBoardForBingo(board, calledNum) {
  // if all rows are marked; sum will be -5 here
  const targetRowSum = board[0].length * constants.MARKER;
  // if all cols are marked; sum will be -5 here
  const targetColSum = board.length * constants.MARKER;
  const boardColSums = [];

  for (let row = 0; row < board.length; row += 1) {
    let currentRowSum = 0;

    for (let col = 0; col < board[row].length; col += 1) {
      const boardNum = board[row][col];
      if (boardNum === calledNum) {
        // mark the number
        board[row][col] = -1;
        // include marked number for row/col sum calculations
        currentRowSum += -1;
        boardColSums[col] = boardColSums[col] - 1;
      } else {
        currentRowSum += boardNum;
        boardColSums[col] = (boardColSums[col] || 0) + boardNum;
      }
    }

    // all numbers in the row are marked
    if (currentRowSum === targetRowSum)
      return { bingo: true, type: 'row', row };
  }

  for (let i = 0; i < boardColSums.length; i += 1) {
    if (boardColSums[i] === targetColSum) {
      return { bingo: true, type: 'col', col: i };
    }
  }

  return { bingo: false };
}

function calculateScore(board, calledNum) {
  let sumOfUnmarked = 0;
  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      const boardNum = board[row][col];
      if (boardNum !== constants.MARKER) {
        sumOfUnmarked += boardNum;
      }
    }
  }
  return sumOfUnmarked * calledNum;
}

function solutionDay04Part1(inputData) {
  // `markAndCheckBoardForBingo` mutates board data. Use a copy.
  const boards = JSON.parse(JSON.stringify(inputData));
  for (let i = 0; i < constants.BINGO_INPUTS.length; i += 1) {
    const calledNum = constants.BINGO_INPUTS[i];
    for (let j = 0; j < boards.length; j += 1) {
      const board = boards[j];
      const status = markAndCheckBoardForBingo(board, calledNum);

      if (status.bingo) {
        const score = calculateScore(board, calledNum);
        console.log('solutionDay04::part1', score);
        return score;
      }
    }
  }
}

function solutionDay04Part2(inputData) {
  // `markAndCheckBoardForBingo` mutates board data. Use a copy.
  const boards = JSON.parse(JSON.stringify(inputData));
  const numberOfBoards = boards.length;
  const completedBoards = [];
  let lastCalledNum = -1;
  for (let i = 0; i < constants.BINGO_INPUTS.length; i += 1) {
    const calledNum = constants.BINGO_INPUTS[i];

    // all boards are completed with bingo
    if (completedBoards.length === numberOfBoards) {
      // it will the previous called number
      lastCalledNum = constants.BINGO_INPUTS[i - 1];
      break;
    }

    for (let j = 0; j < boards.length; j += 1) {
      // if board is alread bingoed skip it
      if (completedBoards.includes(j)) continue;

      const board = boards[j];
      const status = markAndCheckBoardForBingo(board, calledNum);
      if (status.bingo) completedBoards.push(j);
    }
  }

  const lastBoardToBeCompleted =
    boards[completedBoards[completedBoards.length - 1]];
  const score = calculateScore(lastBoardToBeCompleted, lastCalledNum);
  console.log('solutionDay04::part2', score);
  return score;
}

async function solutionDay04() {
  const inputData = await getInputData();
  const part1Solution = solutionDay04Part1(inputData);
  const part2Solution = solutionDay04Part2(inputData);

  return [part1Solution, part2Solution];
}

module.exports = {
  solutionDay04,
};
