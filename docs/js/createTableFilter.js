import { store } from "./createTableComponent.js";
import { reDrawTable } from "./createTableComponent.js";
/**
 * Фильтрует таблицу исходя из переданного слова и столбцов где нужно фильтровать
 * @param {String} text - строка для поиска
 * @returns {Array} отфильтрованная таблица
 *  */
const filterTable = (text, idColSelector) => {
  const selectColElement = document.getElementById(idColSelector);
  const checkboxs = selectColElement.querySelectorAll("input[type=checkbox]");
  const selectedCol = [];
  [...checkboxs].forEach(check => {
    if (check.checked) {
      selectedCol.push(check.id);
    }
  });
  if (text === "") return store.smallTable;

  /* Исключить выбранные поля */
  const filtredTable = store.smallTable.filter(item => {
    const values = Object.values(_.pick(item, selectedCol)).join("");
    return values.indexOf(text) === -1 ? false : true;
  });
  return filtredTable;
};
/**
 * Навешивает обработчик на кнопку поиска по таблице (фильрация) и
 * обработка Enter в поле поиска
 * Обращается к глобальной переменной store.currentPage для перерисоки таблицы
 * @param {String} idInput id строки поиска
 * @param {String} idButton id кнопки поиска
 * @param {String} idSelector id элемента с чекбоксами
 *  */
export const createTableFilter = (idInput, idButton, idSelector) => {
  const searchButton = document.getElementById(idButton);
  searchButton.addEventListener("click", () => {
    const inputText = document.getElementById(idInput).value;
    store.currentTable = filterTable(inputText, idSelector) || [];
    reDrawTable(store.currentPage);
  });
  const searchInput = document.getElementById(idInput);
  searchInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchButton.click();
    }
  });
};
