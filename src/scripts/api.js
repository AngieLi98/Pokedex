import axios from 'axios';

// Función para obtener datos del Pokémon por ID usando Axios
export const fetchPokemon = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching the Pokemon data', error);
  }
};