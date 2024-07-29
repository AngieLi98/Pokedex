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
  
  // Función para mostrar los detalles del Pokémon
  export const renderPokemonDetails = (pokemon) => {
    const detailsContainer = document.getElementById("pokemon-details");
  
    // Crear contenedor principal
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("pokemon-details-container");
  
    // Crear contenedor de imagen y encabezado
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("pokemon-image-container");
  
    // Encabezado con nombre y tipo
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("pokemon-header");
  
    // Crear el ícono del tipo
    const typeIcon = document.createElement("img");
    typeIcon.src = typeIcons[pokemon.types[0].type.name] || ""; // Ruta del ícono
    typeIcon.alt = pokemon.types[0].type.name;
    typeIcon.classList.add("type-icon");
  
    const title = document.createElement("h2");
    title.textContent = pokemon.name;
  
    headerDiv.appendChild(typeIcon);
    headerDiv.appendChild(title);
  
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
    infoDiv.appendChild(createParagraph("Level", pokemon.base_experience || "N/A"));
  
    // Agregar elementos al contenedor principal
    detailsDiv.appendChild(imageDiv);
    detailsDiv.appendChild(infoDiv);
  
    // Limpiar el contenedor y agregar el nuevo contenido
    detailsContainer.innerHTML = "";
    detailsContainer.appendChild(detailsDiv);
  };
  