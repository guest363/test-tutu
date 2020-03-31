const URL = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}`;
const ID_TABLE_HEADER = `tutu--table--head`;
const ID_TABLE_CONTENT = `tutu--table--content`;
const ID_DESCRIPTION = "tutu--table--description";
const ID_TUTU = "tutu";
const ID_LOADER = "loader";
const ID_SEARCH_INPUT = "tutu--search--input";
const ID_SEARCH_BUTTON = "tutu--search--button";
const ID_NAV = "tutu--nav";

let currentPage = 0;
let currentTable;
let bigTable = [],
  smallTable = [],
  indexOfTables = {};
const excluder = ({ adress, description, ...rest }) => rest;
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
const drawDescription = id => {
  const feildToPast = document.getElementById(ID_DESCRIPTION);
  feildToPast.classList.remove("hide");
  const description = descriptionFormatter(bigTable[indexOfTables[id]]);
  feildToPast.innerHTML = description;
};

const drawTable = data => {
  const fragment = new DocumentFragment();
  data.forEach(row => {
    const rowFragment = document.createElement("tr");
    rowFragment.onclick = event => {
      const id = event.currentTarget.firstChild.innerHTML;
      drawDescription(id);
    };
    for (let text in row) {
      const td = document.createElement("td");
      td.textContent = row[text];
      rowFragment.append(td);
    }
    fragment.append(rowFragment);
  });

  const table = document.getElementById(ID_TABLE_CONTENT);
  table.innerHTML = "";
  table.append(fragment);
};

const sorterUPAndDown = () => {
  let savedFeild = "";
  let sortValues = [1, -1];
  const sortFN = feild => (a, b) =>
    a[feild] > b[feild] ? sortValues[0] : sortValues[1];
  return (tableData, feild) => {
    sortValues = savedFeild === feild ? sortValues.reverse() : [1, -1];
    savedFeild = feild;
    return tableData.sort(sortFN(feild));
  };
};

const setThSorter = id => {
  const th = document.getElementById(id);
  const sorter = sorterUPAndDown();
  let savedElem = "";

  th.onclick = event => {
    const element = event.target;
    const feild = element.dataset.feild;
    if (savedElem !== element) {
      savedElem.className = "arrow";
      element.classList.add("down");
    } else {
      element.classList.toggle("up");
      element.classList.toggle("down");
    }
    currentTable = sorter(currentTable, feild);
    savedElem = element;

    drawTable(chunker(currentTable, currentPage));
  };
};

const filterTable = text => {
  if (text === "") return smallTable;
  const filtredTable = smallTable.filter(item => {
    const values = Object.values(item).join("");
    return values.indexOf(text) === -1 ? false : true;
  });
  return filtredTable;
};
const fetchData = async url => {
  if (window.Worker) {
    const downloader = new Worker("fetch.js");
    downloader.postMessage(url);
    return await new Promise(resolve => {
      downloader.onmessage = event => {
        resolve(event.data);
      };
    });
  } else {
    const response = await fetch(url);
    return await response.json();
  }
};

/**
 * Бьет таблицу на куски
 * @param {Array} usbArray массив который нужно разбить
 * @param {Number} chunkNumber номер куска для отправки
 * @returns {Object} { chunk: Array, pages: Number }
 */
const chunker = (arrToChank, chunkNumber = 0) => {
  const chunks = [];
  const maxElementsOnPage = 50;
  const elementsCount = arrToChank.length;
  const pages = Math.ceil(elementsCount / maxElementsOnPage);
  for (let i = 0; i < pages; i++) {
    let elemChunck;
    if (i === 0) {
      elemChunck = [...arrToChank.slice(0, maxElementsOnPage)];
    } else {
      elemChunck = [
        ...arrToChank.slice(i * maxElementsOnPage, (i + 1) * maxElementsOnPage)
      ];
    }
    chunks.push(elemChunck);
  }
  const nav = document.getElementById(ID_NAV);
  const fragment = new DocumentFragment();
  for (let i = 0; i < pages; i++) {
    const page = document.createElement("span");
    page.innerHTML = i;
    page.classList.add("tutu--nav--page");
    if (i === Number(chunkNumber))
      page.classList.add("tutu--nav--page__active");
    page.addEventListener("click", event => {
      currentPage = event.target.innerHTML;
      drawTable(chunker(currentTable, currentPage));
    });
    fragment.append(page);
  }
  nav.innerHTML = "";
  nav.append(fragment);
  return chunks[chunkNumber];
};

(async () => {
  bigTable = [...(await fetchData(URL))];
  bigTable.forEach((obj, index) => {
    smallTable.push(excluder(obj));
    indexOfTables[obj.id] = index;
  });
  currentTable = smallTable;
  drawTable(chunker(smallTable));
  document.getElementById(ID_TUTU).classList.remove("hide");
  document.getElementById(ID_LOADER).classList.add("hide");
  setThSorter(ID_TABLE_HEADER);
  document.getElementById(ID_SEARCH_BUTTON).addEventListener("click", () => {
    const inputText = document.getElementById(ID_SEARCH_INPUT).value;
    currentTable = filterTable(inputText);
    drawTable(chunker(currentTable, currentPage));
  });
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
})();
