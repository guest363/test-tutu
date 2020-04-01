export const fetchData = async url => {
    if (window.Worker) {
      const downloader = new Worker("./workers/fetch.js");
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
  