// Cargar todos los íconos de tipo en un contexto
const importAll = (r) => {
  let icons = {};
  r.keys().forEach((item) => {
    icons[item.replace("./", "").replace(".png", "")] = r(item);
  });
  return icons;
};

// Crear un contexto que apunte a la carpeta de íconos
const typeIcons = importAll(
  require.context("../images/type-icons", false, /\.(png)$/)
);

// Función para crear un párrafo con formato
const createParagraph = (label, value) => {
  const paragraph = document.createElement("p");
  paragraph.innerHTML = `<strong>${label}:</strong> ${value}`;
  return paragraph;
};

// Función para gestionar favoritos en localStorage
const updateFavorite = (pokemonId, isFavorite) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  if (isFavorite) {
    favorites[pokemonId] = true;
  } else {
    delete favorites[pokemonId];
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const isFavorite = (pokemonId) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  return favorites[pokemonId] || false;
};

// Función para mostrar los detalles del Pokémon
export const renderPokemonDetails = (pokemon) => {
  const detailsContainer = document.getElementById("pokemon-details");

  // Limpiar el contenedor antes de agregar el nuevo contenido
  detailsContainer.innerHTML = "";

  // Validar que el objeto Pokémon es válido
  if (!pokemon || !pokemon.types || !pokemon.sprites) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Error: No se pudo cargar los detalles del Pokémon.";
    errorMessage.classList.add("error-message");
    detailsContainer.appendChild(errorMessage);
    console.log("Invalid Pokemon object:", pokemon); // Log para verificar el objeto Pokémon inválido
    return;
  }

  // Crear contenedor principal
  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("pokemon-details-container");

  // Determina el tipo del Pokémon y asigna la clase correspondiente
  const type = pokemon.types[0].type.name;
  detailsDiv.classList.add(`type-${type}`);

  // Crear contenedor de imagen y encabezado
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("pokemon-image-container");

  // Encabezado con nombre y tipo
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("pokemon-header");

  // Crear el ícono del tipo
  const typeIcon = document.createElement("img");
  typeIcon.src = typeIcons[type] ? typeIcons[type] : ""; // Verifica que typeIcons[type] existe
  typeIcon.alt = type;
  typeIcon.classList.add("type-icon");

  const title = document.createElement("h2");
  title.textContent = pokemon.name;

  // Añadir el ícono de estrella para favoritos
  // Crear un ícono de estrella para favoritos
  const favoriteIcon = document.createElement("span");
  favoriteIcon.innerHTML = "★";
  favoriteIcon.classList.add("favorite-icon");

  // Verificar si el Pokémon es favorito
  if (isFavorite(pokemon.id)) {
    favoriteIcon.classList.add("active");
  }

  // Agregar el evento click para alternar el estado de favorito
  favoriteIcon.addEventListener("click", () => {
    favoriteIcon.classList.toggle("active");
    const isFavoriteNow = favoriteIcon.classList.contains("active");
    updateFavorite(pokemon.id, isFavoriteNow);
    console.log(
      `${pokemon.name} is ${
        isFavoriteNow ? "added to" : "removed from"
      } favorites.`
    );
  });

  // Asegúrate de que 'headerDiv' es visible y correctamente añadido al DOM
  headerDiv.appendChild(typeIcon);
  headerDiv.appendChild(title);
  headerDiv.appendChild(favoriteIcon); // Añadir el icono de estrella al encabezado

  // Imagen del Pokémon
  const image = document.createElement("img");
  image.src = pokemon.sprites.other["official-artwork"].front_default; // Ajusta la ruta de la imagen
  image.alt = pokemon.name;
  image.classList.add("pokemon-img");

  imageDiv.appendChild(headerDiv); // Coloca el encabezado encima de la imagen
  imageDiv.appendChild(image);

  // Crear contenedor de información
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("pokemon-info");

  infoDiv.appendChild(createParagraph("No", pokemon.id));
  infoDiv.appendChild(
    createParagraph(
      "Type",
      pokemon.types.map((type) => type.type.name).join(", ")
    )
  );
  infoDiv.appendChild(createParagraph("Height", `${pokemon.height / 10} m`));
  infoDiv.appendChild(createParagraph("Weight", `${pokemon.weight / 10} kg`));
  infoDiv.appendChild(
    createParagraph(
      "Abilities",
      pokemon.abilities.map((ability) => ability.ability.name).join(", ")
    )
  );
  infoDiv.appendChild(
    createParagraph("Level", pokemon.base_experience || "N/A")
  );

  // Agregar elementos al contenedor principal
  detailsDiv.appendChild(imageDiv);
  detailsDiv.appendChild(infoDiv);

  // Agregar el nuevo contenido al contenedor
  detailsContainer.appendChild(detailsDiv);
};
