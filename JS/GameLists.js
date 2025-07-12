// GameLists.js
// =========================================
// This module handles API calls to fetch games list by category
// from the Free-to-Play Games Database API.

const API_HOST = "free-to-play-games-database.p.rapidapi.com";
const API_KEY = "247b84b0f9msheceec3595b983a2p1ca221jsn0de1f0e2345d"; // 🔐 Keep this secure in production

// Fetch all games based on category (MMORPG, Shooter, etc.)
export async function fetchGamesByCategory(category) {
  const url = `https://${API_HOST}/api/games?category=${encodeURIComponent(
    category
  )}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Array of game objects
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return []; // Return empty array to avoid breaking UI
  }
}
