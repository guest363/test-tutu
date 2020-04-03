import { store } from "./createTableComponent.js";
import { reDrawTable } from "./createTableComponent.js";
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
    store.currentTable = sorter(store.currentTable, feild);
    savedElem = element;
    reDrawTable(store.currentPage);
  };
};
/**
 * Рисует шапку и навешивает обработчики
 * @param {String} idElemet id шапки
 * @param {String} thElementList список элементов в шапке таблицы
 *  */
export const createTableHeader = (idElemet, thElementList) => {
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
