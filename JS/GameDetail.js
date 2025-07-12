// GameDetails.js
// ==========================================
// This file contains a single function that fetches
// full game details by ID from the API. It's used when
// a game card is clicked to show full game information.

const API_HOST = "free-to-play-games-database.p.rapidapi.com";
const API_KEY = "247b84b0f9msheceec3595b983a2p1ca221jsn0de1f0e2345d"; // 🔐 Do not expose in production

/**
 * Fetch full game details from the API using the game ID
 * @param {string | number} id - The unique game ID
 * @returns {Promise<Object|null>} Game detail object or null if error
 */
export async function fetchGameDetails(id) {
  const url = `https://${API_HOST}/api/game?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Error fetching game details");
    return await response.json();
  } catch (err) {
    console.error("Fetch Game Details Error:", err);
    return null;
  }
}
