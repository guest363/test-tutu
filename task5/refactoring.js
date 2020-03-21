"use strict";
const STATES = [
  [20, "★☆☆☆☆"],
  [40, "★★☆☆☆"],
  [60, "★★★☆☆"],
  [80, "★★★★☆"],
  [100, "★★★★★"]
];

/**
 * Рисует рейтинг
 * @param {String} vote число от 0 до 100
 * @returns {String} графическое представление рейтинга. Звезды.
 * */

const drawRating = vote => {
  if (vote < 0 || vote > 100) return "Рейтинг должен быть в диапозоне 0 - 100";
  for (let state of STATES) {
    if (Number(vote) <= state[0]) return state[1];
  }
};

module.exports = drawRating;
