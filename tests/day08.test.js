const { solutionDay08 } = require('../puzzles/day08');

describe('day 08', () => {
  test('should be valid for test input', () => {
    return solutionDay08('testInput.txt')
      .then((result) => {
        expect(result).toStrictEqual([26, 61229]);
      })
      .catch((err) => {
        throw err;
      });
  });

  test.skip('should be valid for puzzle input', () => {
    return solutionDay08('input.txt')
      .then((result) => {
        console.log('result', result);
        expect(result).toStrictEqual([255, 982158]);
      })
      .catch((err) => {
        throw err;
      });
  });
});
