'use strict';
/**
 * Запекает N блинчика оптимально на 2 сковородах
 * @param {Number} num - сколько нужно пожарить блинов
 * @returns {Number} время в минутах
 * */
class CAKE {
  constructor(position, link) {
    position: this.position;
    link: this.link
    sideA: false;
    sideB: false;
  }
  cook() {
    console.log(this)
    this.sideA !== true ? (this.sideA = true) : (this.sideB = true);
    if (this.sideA === true && this.sideB === true) this.link.delete(this.position);
  }
}
const PANS = [0, 0];

const prepareCake = (num) => {
  if (num < 1) return 0;
  const pancakes = new Map();
  for (let i = 0; i < num; i++) {
    pancakes.set(i, new CAKE(i, pancakes));
  }
  console.log(pancakes);
  pancakes.get(0).cook();
  pancakes.get(0).cook();
  console.log(pancakes);
};

module.exports = prepareCake;
