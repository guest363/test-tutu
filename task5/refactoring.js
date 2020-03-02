'use strict';
/**
 *
 * */

const drawRating = (vote) => {
  const states = [20, 40, 60, 80, 100];
  const stars = {
    1: '★☆☆☆☆',
    2: '★★☆☆☆',
    3: '★★★☆☆',
    4: '★★★★☆',
    5: '★★★★★',
  };
  for (let block of states) {
    if (vote <= block) return stars[states.indexOf(block) + 1];
  }
};

module.exports = drawRating;
