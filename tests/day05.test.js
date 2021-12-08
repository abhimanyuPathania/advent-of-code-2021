const { solutionDay05 } = require('../puzzles/day05');

describe('day 05', () => {
  test('should be valid for test input', () => {
    return solutionDay05('testInput.txt')
      .then((result) => {
        expect(result).toStrictEqual([5, 12]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should be valid for puzzle input', () => {
    return solutionDay05('input.txt')
      .then((result) => {
        expect(result).toStrictEqual([7674, 20898]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
