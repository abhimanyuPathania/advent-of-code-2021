const { solutionDay06 } = require('../puzzles/day06');

describe('day 06', () => {
  test('should be valid for test input', () => {
    return solutionDay06('testInput.txt')
      .then((result) => {
        // expect(result).toStrictEqual([5934, 26984457539]);
        expect(result).toStrictEqual([5934, undefined]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should be valid for puzzle input', () => {
    return solutionDay06('input.txt')
      .then((result) => {
        expect(result).toStrictEqual([365862, undefined]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
