import { ID_NAV, ID_NAV_COUNTER } from "./constants.js";
import { reDrawTable } from "./table.js";

let currentPage;
const nav = document.getElementById(ID_NAV);
const navCounter = document.getElementById(ID_NAV_COUNTER);
const maxElementsOnPage = 50;

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
 * @returns {Array} массиы из N элементов
 */
export const chunker = (arrToChank, chunkNumber = 0) => {
  const chunks = [];
  const elementsCount = arrToChank.length;
  const pages = Math.ceil(elementsCount / maxElementsOnPage);
  for (let i = 0; i < pages; i++) {
    let elemChunck;
    if (i === 0) {
      elemChunck = [...arrToChank.slice(0, maxElementsOnPage)];
    } else {
      elemChunck = [
        ...arrToChank.slice(i * maxElementsOnPage, (i + 1) * maxElementsOnPage)
      ];
    }
    chunks.push(elemChunck);
  }
  createPagination(pages, chunkNumber);
  createCounter(elementsCount);

  return { chunk: chunks[chunkNumber], page: currentPage };
};
