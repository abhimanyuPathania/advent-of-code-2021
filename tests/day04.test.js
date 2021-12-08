const { solutionDay04 } = require('../puzzles/day04');

test('day 04', () => {
  return solutionDay04()
    .then((result) => {
      expect(result).toStrictEqual([16674, 7075]);
    })
    .catch((err) => {
      throw err;
    });
});
