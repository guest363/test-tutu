import { store } from "./createTableComponent.js";

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
 * При клике по фону скрывает описание/
 * Навешивается один раз.
 *  */
const makeDescriptionHideble = (idFeild, idBg) => {
  let isRun = false;
  return (() => {
    if (isRun) return;
    document.addEventListener(
      "click",
      event => {
        if (event.target.id === idBg) {
          const feildToPast = document.getElementById(idFeild);
          feildToPast.classList.add("hide");
        }
      },
      false
    );
    isRun = true;
  })();
};
/**
 * Рисует дополнительную информацию о строке
 * @param {String} id - id выбранной строки
 * @param {String} idDescriptionFeild - id блока описания
 * @param {String} idBackground - id фона
 *  */
export const drawDescription = (id, idDescriptionFeild, idBackground) => {
  makeDescriptionHideble(idDescriptionFeild, idBackground);
  const feildToPast = document.getElementById(idDescriptionFeild);
  feildToPast.classList.remove("hide");
  const description = descriptionFormatter(
    store.bigTable[store.indexOfTables[id]]
  );
  feildToPast.innerHTML = description;
};
