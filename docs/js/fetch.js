/**
 * Через fetch получает данные с сервера. Пытается сдеать через webworker,
 * если его браузер не поддерживает то просто асинхронно.
 * @param {String} url
 * @return {Object} запрашиваемые данные в виде обьекта
 */
export const fetchData = async url => {
  if (window.Worker) {
    const downloader = new Worker("../workers/fetch.js");
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
