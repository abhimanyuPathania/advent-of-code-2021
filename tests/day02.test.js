const { solutionDay02 } = require('../puzzles/day02');

test('day 01', () => {
  return solutionDay02()
    .then((result) => {
      expect(result).toStrictEqual([1693300, 1857958050]);
    })
    .catch((err) => console.error(err));
});
