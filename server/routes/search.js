const express = require("express");
const axios = require("axios");
const router = express.Router();
const CustomNews = require("../models/CustomNews");
require("dotenv").config();

router.get("/", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "No search query provided" });
  }

  try {
    // Fetching from external API
    const apiResponse = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        apiKey: process.env.NEWS_API_KEY,
        language: "en",
        pageSize: 18,
      },
    });

    // Fetching from custom news database
    const customNews = await CustomNews.find({
      $text: { $search: query },
    });

    console.log("Custom news found:", customNews);

    // Combine results
    const allArticles = [
      ...customNews.map((news) => ({ ...news.toObject(), custom: true })),
      ...apiResponse.data.articles,
    ];

    res.status(200).json({ articles: allArticles });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Error fetching news" });
  }
});

module.exports = router;
