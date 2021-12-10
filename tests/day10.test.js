const { solutionDay10 } = require('../puzzles/day10');

describe('day 10', () => {
  test('should be valid for test input', () => {
    return solutionDay10('testInput.txt')
      .then((result) => {
        expect(result).toStrictEqual([26397, 288957]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should be valid for puzzle input', () => {
    return solutionDay10('input.txt')
      .then((result) => {
        console.log('result', result);
        expect(result).toStrictEqual([268845, 4038824534]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
