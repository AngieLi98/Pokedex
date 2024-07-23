import '../styles/index.scss';
import pokebolaIcon from '../images/pokebola.png';

const headerSection = document.querySelector('.header section');
const imgElement = document.createElement('img');
imgElement.src = pokebolaIcon;
imgElement.alt = 'Pokebola';
imgElement.classList.add('logo-img'); // Añadir una clase para estilos

// Insertar la imagen antes del título
headerSection.insertBefore(imgElement, headerSection.querySelector('h1'));