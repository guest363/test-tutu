import { ID_NAV_COUNTER } from "./constants.js";
const navCounter = document.getElementById(ID_NAV_COUNTER);
/**
 * Рисует счетчик
 * @param {Number} rowCount колличество записей в таблице
 */
export const createCounter = rowCount => {
  const counter = document.createElement("span");
  counter.innerHTML = `<br> Всего ${rowCount} строк`;
  counter.classList.add("tutu--nav--counter--span");
  navCounter.innerHTML = "";
  navCounter.append(counter);
};
