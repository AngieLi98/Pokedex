import '../styles/favorites.scss';
import { createPokemonCard } from './card';
import axios from 'axios';

// Load favorite Pokémon and display them
export const loadFavorites = () => {
  const favoritesContainer = document.getElementById("favorites-container");
  favoritesContainer.innerHTML = ""; // Clear existing content
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};

  if (Object.keys(favorites).length === 0) {
    const noFavoritesMessage = document.createElement("div");
    noFavoritesMessage.className = "no-favorites-message";
    noFavoritesMessage.textContent = "No tienes Pokémon agregados como favoritos.";
    favoritesContainer.appendChild(noFavoritesMessage);
  } else {
    // Display the Pokémon in the order they were saved
    Object.keys(favorites).forEach((pokemonId) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => response.json())
        .then((pokemon) => {
          const card = createPokemonCard(pokemon);
          favoritesContainer.appendChild(card);
        })
        .catch((error) => console.error("Error fetching Pokémon details:", error));
    });
  }
};

// Call the function to load favorites when the page loads
document.addEventListener("DOMContentLoaded", loadFavorites);