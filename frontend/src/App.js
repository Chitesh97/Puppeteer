import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {

  const [screenshot, setScreenshot] = useState(null);

  const takeScreenshot = async () => {
    try {
      const res = await fetch(`http://localhost:5000/screenshot?url=https://google.com&t=${Date.now()}`);
      console.log(res);

      if (!res.ok) {
        throw new Error("Failed to take screenshot");
      }

      const blob = await res.blob();
      setScreenshot(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch screenshot");
    }
  };

  return (
    <div className="App">

      <button onClick={takeScreenshot}>Take Screenshot</button>
      <h2> The screenshot once taken will be added below : </h2>
      {screenshot && <img src={screenshot} alt="Screenshot" />}

    </div>
  );
}

export default App;
