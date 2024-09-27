const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.static("dist"));

// Use dynamic import for node-fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Define the /analyze route
app.post("/analyze", async (req, res) => {
  const { url } = req.body;

  const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${
    process.env.MC_API_KEY
  }&url=${encodeURIComponent(url)}&lang=en`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      // If the response is not OK (e.g., 404 or 500), throw an error
      throw new Error(`API response error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from API:", error);
    res.status(500).json({ error: "Error analyzing the article" });
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
