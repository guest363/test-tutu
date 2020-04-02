/**
 * Скрывает описание
 * @param {String} ID_TUTU элемент при клике на который будет пропадать описание
 * @param {String} ID_LOADER id описания
 */

export const hideLoader = (ID_TUTU, ID_LOADER) => {
  document.getElementById(ID_TUTU).classList.remove("hide");
  document.getElementById(ID_LOADER).classList.add("hide");
};
