/**
 * Рисует шапку и навешивает обработчики
 * @param {String} idElemet id шапки
 * @param {String} thElementList список элементов в шапке таблицы
 *  */
export const createSearcheSelect = (idElemet, thElementList) => {
  const drawTarget = document.getElementById(idElemet);

  const fragment = new DocumentFragment();
  const span = document.createElement("span");
  fragment.append(span);

  span.innerHTML = 'Искать в: '
  thElementList.forEach(th => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", th[0]);
    const label = document.createElement("label");
    label.setAttribute("for", th[0]);
    label.innerHTML = th[1];

    fragment.append(checkbox);
    fragment.append(label);
  });

  drawTarget.innerHTML = "";
  drawTarget.append(fragment);
};
