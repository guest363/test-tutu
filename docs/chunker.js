import { ID_NAV, ID_NAV_COUNTER, MAX_ELEMENT_ON_PAGE } from "./constants.js";
import { reDrawTable } from "./table.js";

let currentPage;
const nav = document.getElementById(ID_NAV);
const navCounter = document.getElementById(ID_NAV_COUNTER);

/**
 * Рисует счетчик
 */
const createCounter = elementsCount => {
  const counter = document.createElement("span");
  counter.innerHTML = `<br> Всего ${elementsCount} строк`;
  counter.classList.add("tutu--nav--counter--span");
  navCounter.innerHTML = "";
  navCounter.append(counter);
};
/**
 * Рисует пагинацию
 */
const createPagination = (pages, chunkNumber) => {
  const fragment = new DocumentFragment();
  for (let i = 0; i < pages; i++) {
    const page = document.createElement("span");
    page.innerHTML = i;
    page.classList.add("tutu--nav--page");
    if (i === Number(chunkNumber))
      page.classList.add("tutu--nav--page__active");
    page.addEventListener("click", event => {
      reDrawTable(event.target.innerHTML);
    });
    fragment.append(page);
  }
  nav.innerHTML = "";
  nav.append(fragment);
};

/**
 * Бьет таблицу на куски и формирует пагинвцию
 * @param {Array} arrToChank массив который нужно разбить
 * @param {Number} chunkNumber номер куска для отправки
 * @returns {Object} {chunks, page} возвращает текущий чанк и номер
 * страницы.
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
