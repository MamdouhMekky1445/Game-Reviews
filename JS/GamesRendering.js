// GamesRendering.js
// ====================================================
// This module handles rendering of the list of game cards
// and the full game detail view in the DOM.

import { fetchGameDetails } from "./GameDetail.js";

// Renders all game cards into the container
export function renderGameCards(games) {
  const container = document.getElementById("games-container");
  container.innerHTML = "";

  games.forEach((game) => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="card text-white border-0 h-100 shadow-sm rounded-4 game-card" 
           style="background-color: #272b30" 
           data-game-id="${game.id}">
        <img src="${game.thumbnail}" class="card-img-top rounded-top-4" alt="${game.title}" />
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title fw-bold text-white">${game.title}</h5>
            <span class="badge bg-primary text-white">Free</span>
          </div>
          <p class="card-text small">${game.short_description}</p>
          <div class="d-flex justify-content-between gap-2 mt-3">
            <span class="badge bg-info text-dark fw-semibold">${game.genre}</span>
            <span class="badge bg-light text-dark fw-semibold">${game.platform}</span>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });

  // Attach click listener to each card for details
  document.querySelectorAll(".game-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const gameId = card.getAttribute("data-game-id");
      const loaderOverlay = document.querySelector(".loader-overlay");
      if (loaderOverlay) loaderOverlay.classList.remove("d-none");

      const game = await fetchGameDetails(gameId);
      if (loaderOverlay) loaderOverlay.classList.add("d-none");

      if (game) renderGameDetail(game);
    });
  });
}

// Renders a full screen view of the clicked game
// Renders a full screen view of the clicked game
export function renderGameDetail(game) {
  const detailContainer = document.getElementById("game-detail");
  const listContainer = document.getElementById("games-container");

  // Show detail view and hide game list
  detailContainer.classList.remove("d-none");
  listContainer.classList.add("d-none");

  detailContainer.innerHTML = `
<div class="game-detail p-4 text-white min-vh-100">
  <div class="container">
    <div class="d-flex justify-content-between align-items-start mb-4">
      <h2>Details Game</h2>
      <button class="btn btn-sm text-white fs-3" id="back-to-list"
              style="background: transparent; border: none;">
        &times;
      </button>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-10 d-flex flex-column flex-md-row gap-4 align-items-start">
        <img src="${game.thumbnail}" class="img-fluid rounded" alt="${game.title}" style="max-width: 400px;" />
        
        <div>
          <h3 class="mb-3">Title: ${game.title}</h3>
          <p><strong>Category:</strong> <span class="badge custom-badge">${game.genre}</span></p>
          <p><strong>Platform:</strong> <span class="badge custom-badge">${game.platform}</span></p>
          <p><strong>Status:</strong> <span class="badge custom-badge">${game.status}</span></p>
          <p>${game.description}</p>
          <a href="${game.game_url}" target="_blank" class="btn btn-warning mt-2">Show Game</a>
        </div>
      </div>
    </div>
  </div>
</div>

  `;

  // Single, clean close logic
  document.getElementById("back-to-list").addEventListener("click", () => {
    detailContainer.classList.add("d-none");
    detailContainer.innerHTML = ""; // optional cleanup
    listContainer.classList.remove("d-none"); // show the list again
  });
}
