export default class Slide {
    container;
    slides;
    controls;
    timer;
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
  }
}
