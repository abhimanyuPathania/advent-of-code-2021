const { solutionDay01 } = require('../puzzles/day01');

test('day 01', () => {
  return solutionDay01()
    .then((result) => {
      expect(result).toStrictEqual([1228, 1257]);
    })
    .catch((err) => {
      throw err;
    });
});
