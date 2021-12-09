const { solutionDay09 } = require('../puzzles/day09');

describe('day 09', () => {
  test('should be valid for test input', () => {
    return solutionDay09('testInput.txt')
      .then((result) => {
        expect(result).toStrictEqual([15, 1134]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('should be valid for puzzle input', () => {
    return solutionDay09('input.txt')
      .then((result) => {
        console.log('result', result);
        expect(result).toStrictEqual([506, 931200]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
