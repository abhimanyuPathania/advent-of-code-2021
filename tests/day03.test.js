const { solutionDay03 } = require('../puzzles/day03');

test('day 03', () => {
  return solutionDay03()
    .then((result) => {
      expect(result).toStrictEqual([1540244, 4203981]);
    })
    .catch((err) => console.error(err));
});
