const { solutionDay06 } = require('../puzzles/day06');

describe('day 06', () => {
  test('should be valid for test input', () => {
    return solutionDay06('testInput.txt')
      .then((result) => {
        expect(result).toStrictEqual([5934, 26984457539]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should be valid for puzzle input', () => {
    return solutionDay06('input.txt')
      .then((result) => {
        expect(result).toStrictEqual([365862, 1653250886439]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
