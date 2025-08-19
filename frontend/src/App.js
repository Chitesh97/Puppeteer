import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {
  const [urls, setUrls] = useState("https://www.google.com, https://www.github.com");
  const [screenshots, setScreenshots] = useState(null);

  const takeScreenshots = async () => {
    try {
      const res = await fetch("http://localhost:5000/screenshots", {
        method: "POST",
        "headers": {"Content-Type": "application/JSON"},
        "body": JSON.stringify({
            urls: urls.split(",").map( u => u.trim() )
          })
        });
      console.log(res);

      if (!res.ok) {
        throw new Error("Failed to take screenshot");
      }

      const data = await res.json();
      setScreenshots(data.screenshots);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch screenshot");
    }
  };

  return (
    <div className="App">
      <h1> Puppeteer example </h1>
      <textarea
      rows={8}
      cols={48}
      value={urls}
      onChange={ (e) => setUrls(e.target.value) }
      placeholder="Enter comma separated values"
      />
      <button onClick={takeScreenshots}>Take Screenshots</button>
      <h2> The screenshot once taken will be added below : </h2>
      { screenshots && screenshots.map((item, index) => (
        <div key={index} style={{ borderBottom: "1px solid", paddingBottom: "24px" }}>
          <h3>{index} - {item.url}</h3>
          <img src={item.screenshot} alt={`Screenshot of ${item.url}`} />
        </div>
      ))}
    </div>
  );
}

export default App;
