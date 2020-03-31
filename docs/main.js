const URL = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}`;
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
  const feildToPast = document.getElementById("tutu--table--description");
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

  const table = document.getElementById("tutu--table--content");
  table.innerHTML = "";
  table.append(fragment);
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
})();
