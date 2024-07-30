import "../styles/index.scss";
import { fetchPokemon } from "./api.js";
import { renderPokemonDetails } from "./render.js";
import pokebolaIcon from "../images/pokebola.png";
import { loadPokemonFooter } from './footerPokemon.js'; 


const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const init = async () => {
  const maxPokemonId = 1000;
  const randomId = getRandomInt(1, maxPokemonId);
  const initialPokemon = await fetchPokemon(randomId);
  renderPokemonDetails(initialPokemon);
  loadPokemonFooter();
};

init();

const headerSection = document.querySelector(".header section");
const imgElement = document.createElement("img");
imgElement.src = pokebolaIcon;
imgElement.alt = "Pokebola";
imgElement.classList.add("logo-img"); // Añadir una clase para estilos

// Insertar la imagen antes del título
headerSection.insertBefore(imgElement, headerSection.querySelector("h1"));


// Obtener elementos del DOM
const searchForm = document.getElementById('busqueda');
const searchInput = document.getElementById('inputBusqueda');

// Función para manejar el envío del formulario
const handleSearchSubmit = async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    await loadPokemonFooter(query);
  } else  {
    await loadPokemonFooter(); // Mostrar Pokémon aleatorios si no hay búsqueda
  }
};

searchForm.addEventListener('submit', handleSearchSubmit);

