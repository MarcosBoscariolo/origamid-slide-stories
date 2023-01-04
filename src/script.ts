import Slide from "./models/classes/Slide.js";

const container = document.getElementById('slide');
const elements = document.getElementById('slide-elements');
const control = document.getElementById('slide-controls');

if(container && elements && control && elements.children.length) {
    new Slide(container, Array.from(elements.children), control, 3000);
}
