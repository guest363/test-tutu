const URL = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}`;
const ID_TABLE_HEADER = `tutu--table--head`;
const ID_TABLE_CONTENT = `tutu--table--content`;
const ID_DESCRIPTION = "tutu--table--description";
const ID_TUTU = "tutu";
const ID_LOADER = "loader";

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
    smallTable = sorter(smallTable, feild);
    savedElem = element;
    drawTable(smallTable);
  };
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

(async () => {
  bigTable = [...(await fetchData(URL))];
  bigTable.forEach((obj, index) => {
    smallTable.push(excluder(obj));
    indexOfTables[obj.id] = index;
  });
  drawTable(smallTable);
  document.getElementById(ID_TUTU).classList.remove("hide");
  document.getElementById(ID_LOADER).classList.add("hide");
  setThSorter(ID_TABLE_HEADER);

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
