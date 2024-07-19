import "./style.css";
import myImage from "./images/tarjeta.png"

const saludar = () => {
    console.log("Hola Mundo!");  
}
 
saludar();

const img = document.createElement("img");
img.src = myImage;
document.body.appendChild(img);