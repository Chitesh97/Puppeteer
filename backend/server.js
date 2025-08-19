const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/screenshot", async (req, res) => {
  const url = req.query.url;

  try {
    if(!url) {
      throw new Error("Missing URL");
    }

    console.log("Taking screenshot of:", url);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    const buffer = await page.screenshot();

    await browser.close();

    res.type("png");
    res.end(buffer, "binary");
  } catch (err) {
    console.error("🚨 Screenshot failed:", err.message);
    console.error(err.stack);

    res.status(500).json({
      error: "Error taking screenshot",
      details: err.message,
    });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
