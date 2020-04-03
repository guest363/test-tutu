import { ID_NAV } from "./constants.js";
import { reDrawTable } from "./createTableComponent.js";
const nav = document.getElementById(ID_NAV);
/**
 * Рисует пагинацию
 * @param {Number} pageCounter колличсетво страниц разбитой таблицы
 * @param {Number} currentPage номер текущей страницы
 */
export const createPagination = (pageCounter, currentPage) => {
  const fragment = new DocumentFragment();
  for (let i = 0; i < pageCounter; i++) {
    const page = document.createElement("span");
    page.innerHTML = i;
    page.classList.add("tutu--nav--page");
    if (i === Number(currentPage)) {
      page.classList.add("tutu--nav--page__active");
    }
    page.addEventListener("click", event => {
      reDrawTable(event.target.innerHTML);
    });
    fragment.append(page);
  }
  nav.innerHTML = "";
  nav.append(fragment);
};
