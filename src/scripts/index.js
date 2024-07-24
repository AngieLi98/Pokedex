import "../styles/index.scss";
import { fetchPokemon } from "./api.js";
import { renderPokemonDetails } from "./render.js";
import pokebolaIcon from "../images/pokebola.png";
import { loadPokemonFooter } from './footerPokemon.js'; 

const init = async () => {
  const initialPokemon = await fetchPokemon(6);
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
