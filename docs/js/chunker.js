import { MAX_ELEMENT_ON_PAGE } from "./constants.js";
import { createPagination } from "./createPagination.js";
import { createCounter } from "./createCounter.js";

/**
 * Бьет таблицу на куски и формирует пагинвцию
 * @param {Array} arrToChank массив который нужно разбить
 * @param {Number} chunkNumber номер куска для отправки
 * @returns {Object} chunks возвращает нужный кусок таблицы
 */
export const chunker = (arrToChank, chunkNumber = 0) => {
  const chunks = [];
  const elementsCount = arrToChank.length;
  const pages = Math.ceil(elementsCount / MAX_ELEMENT_ON_PAGE);
  for (let i = 0; i < pages; i++) {
    chunks.push(
      arrToChank.slice(i * MAX_ELEMENT_ON_PAGE, (i + 1) * MAX_ELEMENT_ON_PAGE)
    );
  }
  createPagination(pages, chunkNumber);
  createCounter(elementsCount);

  return chunks[chunkNumber];
};
