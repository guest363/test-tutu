if (window.Worker) {
} else {
}
import getUsers from "./getUsers";
let store = {
  users: [],
  page: 0
};
store.getUsers = async url => {
  if (window.Worker) {
    const downloader = new Worker("fetch.js");
    downloader.onmessage = function(e) {
      // Log filtered list
      console.log(e.data);
    };
  } else {
    const response = await fetch(url);
    this.users = await response.json();
    console.log(this.users);
  }
};

export default store;
