import { ID_DESCRIPTION } from "./constants.js";

const descriptionFormatter = obj => {
  return `
  Выбран пользователь <b>${obj.firstName} ${obj.lastName}</b> <br>
  Описание:<br>
  <textarea>
  ${obj.description}
  </textarea><br>
  Адрес проживания: <b>${obj.adress.streetAddress}</b><br>
  Город: <b>${obj.adress.city}</b><br>
  Провинция/штат: <b>${obj.adress.state}</b><br>
  Индекс: <b>${obj.adress.zip}</b><br>`;
};
/**
 * Рисует дополнительную информацию о строке
 * @param {String} id - id выбранной строки
 * @param {Array} bigTable - полная таблица
 * @param {Object} indexOfTables - обьект для быстрой навигации
 *  */
export const drawDescription = (id, bigTable, indexOfTables) => {
  const feildToPast = document.getElementById(ID_DESCRIPTION);
  feildToPast.classList.remove("hide");
  const description = descriptionFormatter(bigTable[indexOfTables[id]]);
  feildToPast.innerHTML = description;
};
