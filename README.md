# Тестовое задание на позицию frontend-разработчик от Tutu
Для тестов используются библиотеки chai и mocha.
В папке с каждым заданием идут тесты. Те, что даны в условии и от себя.
Для запуска тестов `npm run test`

## Задача №1
Сложность линейная, нужно один раз пройтись по массиву.

``` js
'use strict';
/** 
 *  Подсчитывает количество идущих подряд символов s1 и s2 в строке,
 *  без учёта регистра.
 * @param {String} str - строка в котрой искать
 * @param {String} s1 - первый символ для поиска
 * @param {String} s2 - второй символ для поиска
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
Решение так себе по читаемости. Но сложность O является линейной.

При внесении изменений в набор скобок меняется только одна константа.
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
Ответ - 3 минуты достаточно для приготовления, если учесть все накладные расходы за 0; Снятие блинов со сковродки, переворачивание и т.д.

Алгоритм: 
* В обе сковородки наливается тесто. 
* 1 минута 
* С одной из сковородок блинчик снимается и заливается новое тесто, второй блинчик переворачивается 
* 1 минута 
* Оба блинчика переворачиваются 
* 1 минута Б
* линчики готовы за 3 минуты

Большая часть кода для красоты вывода.

``` js
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
```

Вывод программы в консоль 

```
Состояние блинчиков на 0-й минуте   Полуготов,  Полуготов,  Неготов
Состояние блинчиков на 1-й минуте   Полуготов,  Готов    ,  Полуготов
Состояние блинчиков на 2-й минуте   Готов    ,  Готов    ,  Готов
```

## Задача 4 на рефакторинг

``` js
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

```