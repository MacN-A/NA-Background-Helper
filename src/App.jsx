import "./App.css";
import { useState } from "react";

function App() {
  const [color, setColor] = useState("");
  const [url, setUrl] = useState("");

  const backgroundColor = async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
        chrome.storage.sync.set({ backgroundColor: color });
      },
    });
  };

  const clearBackgroundColor = async () => {
    setColor("");
    let [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.body.style.backgroundColor = "";
        chrome.storage.sync.set({ backgroundColor: "" });
      },
    });
  };

  const backgroundImage = async () => {
    let [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [url],
      func: (imageUrl) => {
        document.body.style.backgroundImage = "url(" + imageUrl + ")";
        chrome.storage.sync.set({ backgroundUrl: imageUrl });
      },
    });
  };

  const clearBackgroundImage = async () => {
    setUrl("");
    let [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.body.style.backgroundImage = "";
        chrome.storage.sync.set({ backgroundUrl: "" });
      },
    });
  };

  return (
    <>
      <div>
        <h1>Naruto-Arena Background Helper</h1>
        <div className="card">
          <input
            type="color"
            onChange={(e) => setColor(e.currentTarget.value)}
          ></input>
          <button onClick={() => backgroundColor()}>
            Set Background Color
          </button>
          <button
            onClick={() => {
              clearBackgroundColor();
            }}
          >
            Clear Background Color
          </button>
        </div>
        <div className="card">
          <input
            type="text"
            placeholder="insert url here"
            onChange={(e) => setUrl(e.currentTarget.value)}
          ></input>
          <button onClick={() => backgroundImage()}>
            Set Background Image
          </button>
          <button
            onClick={() => {
              clearBackgroundImage();
            }}
          >
            Clear Background Image
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
