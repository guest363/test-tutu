self.onmessage = async function(url) {
  const response = await fetch(url.data);
  const users = await response.json();
  self.postMessage(users);
  close();
};
