# Тестовое задание на позицию frontend-разработчик от Tutu
Для тестов используются библиотеки chai и mocha.
В папке с каждым заданием идут тесты. Те, что даны в условии и от себя.
Для запуска тестов `npm run test`

## Задача №1
``` 
'use strict';
/**
 *  Подсчитывает количество идущих подряд символов s1 и s2 в строке,
 *  без учёта регистра.
 * @param {String} str - строка в котрой искать
 * @param {String} s1 - первый символ для поиска
 * @param {String} s2 -второй символ для поиска
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