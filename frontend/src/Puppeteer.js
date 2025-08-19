import React, { useState } from "react";

export default async function Puppeteer() {
  const [screenshot, setScreenshot] = useState(null);

  const takeScreenshot = async () => {
    const res = await fetch("http://localhost:5000/screenshot?url=https://reactjs.org");
    const blob = await res.blob();
    setScreenshot(URL.createObjectURL(blob));
  };

  return (
    <div>
      <button onClick={takeScreenshot}>Take Screenshot</button>
      {screenshot && <img src={screenshot} alt="Screenshot" />}
    </div>
  );
}