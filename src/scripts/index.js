import "../styles/index.scss";
import { fetchPokemon } from "./api.js";
import { renderPokemonDetails } from "./render.js";
import pokebolaIcon from "../images/pokebola.png";

const init = async () => {
  const initialPokemon = await fetchPokemon(48);
  renderPokemonDetails(initialPokemon);
};

init();

const headerSection = document.querySelector(".header section");
const imgElement = document.createElement("img");
imgElement.src = pokebolaIcon;
imgElement.alt = "Pokebola";
imgElement.classList.add("logo-img"); // Añadir una clase para estilos

// Insertar la imagen antes del título
headerSection.insertBefore(imgElement, headerSection.querySelector("h1"));
