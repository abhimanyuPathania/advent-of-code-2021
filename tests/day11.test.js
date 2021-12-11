const { solutionDay11 } = require('../puzzles/day11');

describe('day 11', () => {
  test('should be valid for test input', () => {
    return solutionDay11('testInput.txt')
      .then((result) => {
        expect(result).toStrictEqual([1656, 195]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should be valid for puzzle input', () => {
    return solutionDay11('input.txt')
      .then((result) => {
        console.log('result', result);
        expect(result).toStrictEqual([1739, 324]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
