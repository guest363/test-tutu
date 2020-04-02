import {
  URL,
  ID_TABLE_HEADER,
  ID_TABLE_CONTENT,
  ID_DESCRIPTION,
  ID_TUTU,
  ID_LOADER,
  ID_SEARCH_INPUT,
  ID_SEARCH_BUTTON,
  TABLE_HEADER_ELEMENTS,
  ID_SEARCHE_COLUM_SELCTOR
} from "./constants.js";

import { drawDescription } from "./description.js";
import { fetchData } from "./fetch.js";
import { excluder } from "./support.js";
import { hideLoader } from "./loader.js";
import { chunker } from "./chunker.js";

const TABLE = document.getElementById(ID_TABLE_CONTENT);

let currentPage = 0;
let currentTable;
let bigTable = [],
  smallTable = [],
  indexOfTables = {};

export const reDrawTable = selectPage => {
  currentPage = selectPage;
  drawTable(chunker(currentTable, selectPage) || []);
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
      drawDescription(id, bigTable, indexOfTables);
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
 * Фильтрует таблицу исходя из переданного слова и столбцов где нужно фильтровать
 * @param {String} text - строка для поиска
 * @param {Array} col - колонки в которых производить поиск
 * @returns {Array} отфильтрованная таблица
 *  */
const filterTable = text => {
  if (text === "") return smallTable;
  const filtredTable = smallTable.filter(item => {
    const values = Object.values(item).join("");
    return values.indexOf(text) === -1 ? false : true;
  });
  return filtredTable;
};

/**
 * При инициализации
 * создает в замыкании переменные для сохранения предудущего столбца фильрации
 * и способа фильрации.
 * @returns {Function}
 *  */
const sorterUPAndDown = () => {
  let savedFeild = "";
  let sortValues = [1, -1];
  const sortFN = feild => (a, b) =>
    a[feild] > b[feild] ? sortValues[0] : sortValues[1];
  /**
   * Сортирует по возрастанию и убыванию.
   * @param {Array} tableData таблица для сортировки
   * @param {String} feild поле по которому сортировать. выбирается кликом.
   * @returns {Array} отсортированная таблица
   *  */
  return (tableData, feild) => {
    sortValues = savedFeild === feild ? sortValues.reverse() : [1, -1];
    savedFeild = feild;
    return tableData.sort(sortFN(feild));
  };
};
/**
 * Навешивает обрабочки фильрации по клику на шапку таблицы и рисует
 * стрелки показывающие способ сортировки. Вызывает перерисовку таблицы,
 * при этом сохраняется позиция выбранная в навигации
 * @param {Object} th ячейка шапки
 *  */
const setThSorter = th => {
  const sorter = sorterUPAndDown();
  let savedElem = "";

  th.onclick = event => {
    const element = event.target;
    const feild = element.dataset.feild;
    if (savedElem === "") {
      element.classList.add("down");
    } else if (savedElem !== element) {
      savedElem.className = "arrow";
      element.classList.add("down");
    } else {
      element.classList.toggle("up");
      element.classList.toggle("down");
    }
    currentTable = sorter(currentTable, feild);
    savedElem = element;
    reDrawTable(currentPage);
  };
};
/**
 * Инициализирует начальные переменные с данными
 *  */
const initData = async () => {
  bigTable = [...(await fetchData(URL))];
  bigTable.forEach((obj, index) => {
    smallTable.push(excluder(obj));
    indexOfTables[obj.id] = index;
  });
  currentTable = smallTable;
};
/**
 * При клике по фону скрывает описание
 *  */
const makeDescriptionHideble = () => {
  document.addEventListener(
    "click",
    event => {
      if (event.target.id === ID_TUTU) {
        const feildToPast = document.getElementById(ID_DESCRIPTION);
        feildToPast.classList.add("hide");
      }
    },
    false
  );
};
/**
 * Навешивает обработчик на кнопку поиска по таблице (фильрация)
 * Обращается к глобальной переменной currentPage для перерисоки таблицы
 *  */
const initFilter = () => {
  document.getElementById(ID_SEARCH_BUTTON).addEventListener("click", () => {
    const inputText = document.getElementById(ID_SEARCH_INPUT).value;
    currentTable = filterTable(inputText) || [];
    reDrawTable(currentPage);
  });
};
/**
 * Рисует шапку и навешивает обработчики
 * @param {String} idElemet id шапки
 * @param {String} thElementList список элементов в шапке таблицы
 *  */
const createTableHeader = (idElemet, thElementList) => {
  const drawTarget = document.getElementById(idElemet);

  const fragment = new DocumentFragment();
  thElementList.forEach(th => {
    const thFragment = document.createElement("th");
    thFragment.classList.add("arrow");
    const customAttr = document.createAttribute("data-feild");
    customAttr.value = th[0]; // Set the value of the class attribute
    thFragment.setAttributeNode(customAttr);
    thFragment.innerHTML = th[1];
    setThSorter(thFragment);
    fragment.append(thFragment);
  });

  drawTarget.innerHTML = "";
  drawTarget.append(fragment);
};

/**
 * Рисует шапку и навешивает обработчики
 * @param {String} idElemet id шапки
 * @param {String} thElementList список элементов в шапке таблицы
 *  */
const createSearcheSelect = (idElemet, thElementList) => {
  const drawTarget = document.getElementById(idElemet);

  const fragment = new DocumentFragment();
  thElementList.forEach(th => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", th[0]);
    const label = document.createElement("label");
    label.setAttribute("for", th[0]);
    label.innerHTML = th[1];

    fragment.append(checkbox);
    fragment.append(label);
  });

  drawTarget.innerHTML = "";
  drawTarget.append(fragment);
};

/**
 * Инициализирует компонент Таблица
 *  */
export const createTableComponent = async () => {
  await initData();
  drawTable(chunker(currentTable));
  hideLoader(ID_TUTU, ID_LOADER);
  makeDescriptionHideble();
  createTableHeader(ID_TABLE_HEADER, TABLE_HEADER_ELEMENTS);
  initFilter();
  createSearcheSelect(ID_SEARCHE_COLUM_SELCTOR, TABLE_HEADER_ELEMENTS);
};