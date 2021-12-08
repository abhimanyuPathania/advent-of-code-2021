const { solutionDay07 } = require('../puzzles/day07');

describe('day 07', () => {
  test('should be valid for test input', () => {
    return solutionDay07('testInput.txt')
      .then((result) => {
        expect(result).toStrictEqual([37, 168]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should be valid for puzzle input', () => {
    return solutionDay07('input.txt')
      .then((result) => {
        expect(result).toStrictEqual([356958, 105461913]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
