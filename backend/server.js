const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/screenshots", async (req, res) => {
  const urls = req.body.urls;

  try {
    if(!urls) {
      throw new Error("Missing URLs");
    }

    const browser = await puppeteer.launch();
    const results = [];

    for (const url of urls) {
      const page = await browser.newPage();
      await page.goto(url, {waitUntil: "networkidle2"});

      const buffer = await page.screenshot({ encoding: "base64" });

      results.push({
        url: url,
        screenshot: `data:image/png;base64,${buffer}`
      })

      await page.close();
    }

    await browser.close();

    res.json({ screenshots: results });

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
