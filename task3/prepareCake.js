'use strict';
/**
 * Запекает N блинчика оптимально на P сковородах
 * @param {Number} numCakes - сколько нужно пожарить блинов
 * @param {Number} numPans - сколько есть сковородок
 * @returns {Number} время в минутах
 * */

const prepareCake = (numCakes = 3, numPans = 2) => {
  return numCakes % numPans === 0
    ? Math.floor(numCakes / numPans) * 2
    : Math.floor(numCakes / numPans) * 2 + 1;
};

module.exports = prepareCake;
