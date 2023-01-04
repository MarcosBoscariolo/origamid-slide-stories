import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  timer: number;
  index: number;
  slide: Element;
  timeout: Timeout | null;
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
    this.timeout = null;

    this.onInit();
  }

  private onInit() {
    this.addControls();
    this.showSlide(this.index);
  }

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "Slide anterior";
    nextButton.innerText = "Próximo slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);
    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
  }

  prev() {
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.showSlide(prev);
  }

  next() {
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.showSlide(next);
  }

  hide(element: Element) {
    element.classList.remove("active");
  }

  showSlide(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.forEach((slide) => this.hide(slide));
    this.slides[index].classList.add("active");
    this.auto(this.timer);
  }

  auto(timer: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), timer);
  }
}
