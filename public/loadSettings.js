chrome.storage.sync.get(["backgroundColor", "backgroundUrl"]).then((result) => {
  console.log(result);
  document.body.style.backgroundColor = result.backgroundColor;
  document.body.style.backgroundImage = "url(" + result.backgroundUrl + ")";
});
