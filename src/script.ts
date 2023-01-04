import Slide from "./models/classes/Slide.js";

const container = document.getElementById('slide');
const slides = document.getElementById('slide-elements');
const control = document.getElementById('slide-controls');

if(container && slides && control && slides.children.length) {
    new Slide(container, Array.from(slides.children), control, 3000);
}
