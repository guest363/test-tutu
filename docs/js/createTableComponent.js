import {
  URL,
  ID_TABLE_HEADER,
  ID_TABLE_CONTENT,
  ID_TUTU,
  ID_LOADER,
  ID_SEARCH_INPUT,
  ID_SEARCH_BUTTON,
  TABLE_HEADER_ELEMENTS,
  ID_SEARCHE_COLUM_SELCTOR,
  EXCLUD_COL_FROM_DOM,
  ID_DESCRIPTION
} from "./constants.js";

import { drawDescription } from "./drawDescription.js";
import { fetchData } from "./fetch.js";
import { hideLoader } from "./loader.js";
import { chunker } from "./chunker.js";
import { createTableHeader } from "./createTableHeader.js";
import { createTableFilter } from "./createTableFilter.js";
import { createSearcheSelect } from "./createSearcheSelect.js";

const TABLE = document.getElementById(ID_TABLE_CONTENT);

export const store = {
  currentPage: 0,
  currentTable: "",
  bigTable: [],
  smallTable: [],
  indexOfTables: {}
};

export const reDrawTable = selectPage => {
  store.currentPage = selectPage;
  drawTable(chunker(store.currentTable, selectPage) || []);
};
/**
 * Рисует таблицу по переданным данным и навешивает обработчики.
 * Вся таблица добавляется фрагментов, предыдущие значения
 * стираются через innerHTML
 * @param {Array} data - массив обьектов с входными данными для таблицы
 *  */

export const drawTable = data => {
  const fragment = new DocumentFragment();
  data.forEach(row => {
    const rowFragment = document.createElement("tr");
    rowFragment.onclick = event => {
      const id = event.currentTarget.firstChild.innerHTML;
      drawDescription(id, ID_DESCRIPTION, ID_TUTU);
    };
    for (let text in row) {
      const td = document.createElement("td");
      td.textContent = row[text];
      rowFragment.append(td);
    }
    fragment.append(rowFragment);
  });

  TABLE.innerHTML = "";
  TABLE.append(fragment);
};

/**
 * Инициализирует начальные переменные с данными
 *  */
const initData = async () => {
  store.bigTable = [...(await fetchData(URL))];
  store.bigTable.forEach((obj, index) => {
    store.smallTable.push(_.omit(obj, EXCLUD_COL_FROM_DOM));
    store.indexOfTables[obj.id] = index;
  });
  store.currentTable = store.smallTable;
};

/**
 * Инициализирует компонент Таблица
 *  */
export const createTableComponent = async () => {
  await initData();
  drawTable(chunker(store.currentTable));
  hideLoader(ID_TUTU, ID_LOADER);
  createTableHeader(ID_TABLE_HEADER, TABLE_HEADER_ELEMENTS);
  createTableFilter(
    ID_SEARCH_INPUT,
    ID_SEARCH_BUTTON,
    ID_SEARCHE_COLUM_SELCTOR
  );
  createSearcheSelect(ID_SEARCHE_COLUM_SELCTOR, TABLE_HEADER_ELEMENTS);
};
