# Тестовое задание на позицию frontend-разработчик от Tutu
Для тестов используются библиотеки chai и mocha.
В папке с каждым заданием идут тесты. Те, что даны в условии и от себя.
Для запуска тестов `npm run test`

## Задача №1
``` js
'use strict';
/** 
 *  Подсчитывает количество идущих подряд символов s1 и s2 в строке,
 *  без учёта регистра.
 * @param {String} str - строка в котрой искать
 * @param {String} s1 - первый символ для поиска
 * @param {String} s2 -второй символ для поиска
 * @returns {Number}
 * */

const dscount = (str = '', s1 = '', s2 = '') => {
  const splitedStr = str.toString().toLowerCase().split('');
  const referSeq = s1.toString() + s2.toString();
  return splitedStr.reduce((counter, char, index) => {
    const testSeq = char + splitedStr[index + 1];
    return testSeq === referSeq ? counter + 1 : counter;
  }, 0);
};

module.exports = dscount;

```

## Задача 2


``` js
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
```

## Задача 3. Алгоритмы
Ответ - 3 минуты достаточно для пригтовления, если учесть все накладные расходы за 0; Снятие блинов со сковродки, переворачивание и т.д.

Алгоритм: В обе сковородки наливается тесто. - 1 минута - С одной из сковородок блинчик снимается и заливается новое тесто, второй блинчик переворачивается - 1 минута - оба блинчика переворачиваются - 1 минута - блинчики готовы.

