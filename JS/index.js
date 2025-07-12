// index.js
// =========================================
// This is the main entry point of the app.
// It initializes the page, handles UI events, and manages switching
// between the game list view and the game detail view.

import { fetchGamesByCategory } from "./GameLists.js";
import { fetchGameDetails } from "./GameDetail.js";
import { renderGameCards, renderGameDetail } from "./GamesRendering.js";

// Display the loader overlay
function showLoader() {
  document.querySelector(".loader-overlay")?.classList.remove("d-none");
}

// Hide the loader overlay
function hideLoader() {
  document.querySelector(".loader-overlay")?.classList.add("d-none");
}

// Fetch and display list of games by category
async function displayGames(category) {
  showLoader();
  try {
    const games = await fetchGamesByCategory(category);
    renderGameCards(games);
  } catch (err) {
    console.error("Error loading games:", err);
  } finally {
    hideLoader();
  }
}

// Fetch and display details for a single game
async function displayGameDetail(id) {
  showLoader();
  try {
    const game = await fetchGameDetails(id);
    renderGameDetail(game);
  } catch (err) {
    console.error("Error loading game detail:", err);
  } finally {
    hideLoader();
  }
}

// Toggle mobile category menu
function setupMobileToggle() {
  const toggleBtn = document.getElementById("toggle-navbar");
  const mobileCategories = document.getElementById("category-buttons-mobile");

  toggleBtn?.addEventListener("click", () => {
    mobileCategories?.classList.toggle("d-none");
  });
}

// Handle clicking on category buttons
function setupCategoryButtons() {
  const allCategoryButtons = document.querySelectorAll(".category-btn");
  const mobileCategories = document.getElementById("category-buttons-mobile");

  allCategoryButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      allCategoryButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const selectedCategory = this.dataset.category;
      displayGames(selectedCategory);

      // Auto-hide mobile nav on selection
      if (window.innerWidth < 768) {
        mobileCategories?.classList.add("d-none");
      }
    });
  });
}

// Handle clicking on a game card
function setupCardClickListener() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card[data-game-id]");
    if (card) {
      const id = card.getAttribute("data-game-id");
      displayGameDetail(id);
    }
  });
}

// Handle closing game detail view
function setupBackToList() {
  document.addEventListener("click", (e) => {
    if (e.target.id === "back-to-list") {
      const activeBtn = document.querySelector(".category-btn.active");
      const selectedCategory = activeBtn?.dataset.category || "Shooter";
      displayGames(selectedCategory);
    }
  });
}

// Initial page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 index.js loaded");

  setupMobileToggle();
  setupCategoryButtons();
  setupCardClickListener();
  setupBackToList();

  displayGames("Mmorpg"); // Default load
});
