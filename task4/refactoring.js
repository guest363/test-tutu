'use strict';
/**
 * Возвращает индекс того символа, что встречается первым с конца 
 * из переданных во 2 и 3 параметрах или -1 если совпадений нет
 * @param {String} str строка для поиска
 * @param {String} a первый символ для поиска
 * @param {String} b второй символ для поиска
 * */

const getLastIndex = (str = '', a = '', b = '') => {
  const lastA = str.lastIndexOf(a);
  const lastB = str.lastIndexOf(b);
  return Math.max(lastA, lastB);
};

module.exports = getLastIndex;
