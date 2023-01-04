export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  timer: number;
  index: number;
  slide: Element;
  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    timer: number = 5000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.timer = timer;
    this.index = 0;
    this.slide = this.slides[this.index];

    this.showSlide(this.index);
  }

  hide(element: Element) {
    element.classList.remove("active");
  }

  showSlide(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.forEach((slide) => this.hide(slide));
    this.slides[index].classList.add("active");
  }
}
