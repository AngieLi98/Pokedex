// Function to get the color for a given Pokémon type
const getTypeColor = (type) => {
  const typeColors = {
    normal: "#E3DAC9",
    fire: "#FF5733",
    water: "#3498DB",
    electric: "#F1C40F",
    grass: "#2ECC71",
    ice: "#1ABC9C",
    fighting: "#E74C3C",
    poison: "#9B59B6",
    ground: "#D35400",
    flying: "#8E44AD",
    psychic: "#F39C12",
    bug: "#27AE60",
    rock: "#BDC3C7",
    ghost: "#6C3483",
    dragon: "#E67E22",
    dark: "#34495E",
    steel: "#95A5A6",
    fairy: "#F5B7B1",
  };
  return typeColors[type] || "#E3DAC9";
};

// Import the loadFavorites function
import { loadFavorites } from "./favorites";

// Function to remove a Pokémon from favorites
const removeFavorite = (pokemonId) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  delete favorites[pokemonId];
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
};

// Function to create a Pokémon card
export const createPokemonCard = (pokemon) => {
  const card = document.createElement("div");
  card.className = "pokemon-card";

  const imageSection = document.createElement("div");
  imageSection.className = "pokemon-image";
  imageSection.style.backgroundColor = getTypeColor(pokemon.types[0].type.name);

  const image = document.createElement("img");
  image.src = pokemon.sprites.other["official-artwork"].front_default;
  image.alt = pokemon.name;

  const hp = document.createElement("div");
  hp.className = "pokemon-hp";
  hp.textContent = `HP ${
    pokemon.stats.find((stat) => stat.stat.name === "hp").base_stat
  }`;

  imageSection.appendChild(image);
  imageSection.appendChild(hp);

  const infoSection = document.createElement("div");
  infoSection.className = "pokemon-info";

  const name = document.createElement("h2");
  name.className = "pokemon-name";
  name.textContent = pokemon.name;
  infoSection.appendChild(name);

  const types = document.createElement("div");
  types.className = "pokemon-types";
  pokemon.types.forEach((typeInfo, index) => {
    const type = document.createElement("span");
    type.className = `type ${typeInfo.type.name}`;
    type.textContent = typeInfo.type.name;

    if (index === 0) {
      const deleteIcon = document.createElement("span");
      deleteIcon.className = "delete-icon";
      deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteIcon.onclick = () => {
        if (
          window.confirm(
            `¿Estás seguro de que quieres eliminar a ${pokemon.name} de tus favoritos?`
          )
        ) {
          removeFavorite(pokemon.id);
        }
      };
      types.appendChild(deleteIcon);
    }

    types.appendChild(type);
  });

  infoSection.appendChild(types);

  const stats = document.createElement("div");
  stats.className = "pokemon-stats";
  ["attack", "defense", "speed"].forEach((statName) => {
    const stat = document.createElement("div");
    stat.className = "stat";
    const value = document.createElement("span");
    value.className = "value";
    value.textContent = pokemon.stats.find(
      (stat) => stat.stat.name === statName
    ).base_stat;
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = statName.charAt(0).toUpperCase() + statName.slice(1);
    stat.appendChild(value);
    stat.appendChild(label);
    stats.appendChild(stat);
  });
  infoSection.appendChild(stats);

  card.appendChild(imageSection);
  card.appendChild(infoSection);

  return card;
};