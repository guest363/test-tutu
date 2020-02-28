'use strict';
/**
 * Проверяет строку на синтаксическую верность последовательности
 * скобок.
 * @param {String} str - строка для проверки
 * @returns {Number} 0 если скобки расставлены верно и 1 если есть ошибка
 * */

const checkSyntax = (str = '') => {
  const TYPES = `<>{}()[]`;
  const tuples = [];
  const indexObj = {};
  const openStack = [];
  /* Создать пары вида [openChar, closeChar, counter] 
  и обьект для быстрой проверки символов */
  TYPES.split('').reduce((counter, char, index) => {
    indexObj[char] = counter;
    tuples[counter] = index % 2 !== 1 ? [char] : [...tuples[counter], char, 0];
    return index % 2 === 1 ? counter + 1 : counter;
  }, 0);
  for (let char of str.toString()) {
    if (indexObj.hasOwnProperty(char)) {
      const tupleIndex = indexObj[char];
      const currentTuple = tuples[tupleIndex];
      if (tuples[tupleIndex][0] === char) {
        openStack.push(tupleIndex);
        currentTuple[2] += 1;
      } else {
        currentTuple[2] -= 1;
        if (
          openStack[openStack.length - 1] !== tupleIndex ||
          currentTuple[2] < 0
        )
          return 1;
        openStack.pop();
      }
    }
  }
  return 0;
};

module.exports = checkSyntax;
