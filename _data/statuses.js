const EleventyFetch = require("@11ty/eleventy-fetch");
const dotenv = require("dotenv");
dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

module.exports = async function () {
  try {
    const statuses = await EleventyFetch(
      `${API_BASE_URL}statuses?orderBy=desc&take=1`,
      {
        duration: "1d",
        type: "json",
      }
    );
    return statuses;
  } catch (e) {
    console.log("Failed fetching status, returning default", e);
    return [
      {
        content: "working on the status message API.",
        emoji: "🔧",
        relativeTime: "Just now",
        contentAndEmoji: "working on the status message API. 🔧",
      },
    ];
  }
};
