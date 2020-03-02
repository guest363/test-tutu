'use strict';
const getStates = (cakes) => {
  return cakes.map((item) => {
    switch (item) {
      case 1:
        return '  Полуготов';
      case 2:
        return '  Готов    ';
      default:
        return '  Неготов  ';
    }
  });
};

/**
 * Запекает 3 блинчика оптимально на 2 сковородах
 * @returns {Number} время в минутах и как печется в консоль
 * */

const prepareCake = () => {
  const pancakes = [0, 0, 0];

  const cooker = (cakes, minuts = 0) => {
    const sortedCakes = cakes.sort((a, b) => a - b);
    if (sortedCakes.every((i) => i === 2)) {
      return minuts;
    }
    sortedCakes[0] += 1;
    sortedCakes[1] += 1;
    console.log(
      `Состояние блинчиков на ${minuts}-й минуте ${getStates(sortedCakes)}`,
    );
    return cooker(sortedCakes, minuts + 1);
  };
  return cooker(pancakes);
};

module.exports = prepareCake;
