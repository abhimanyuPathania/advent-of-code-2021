const { solutionDay13 } = require('../puzzles/day13');

describe('day 13', () => {
  test('should be valid for test input', () => {
    return solutionDay13('testInput.txt')
      .then((result) => {
        expect(result).toStrictEqual([17, 16]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should be valid for puzzle input', () => {
    return solutionDay13('input.txt')
      .then((result) => {
        console.log('result', result);
        expect(result).toStrictEqual([807, 98]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
