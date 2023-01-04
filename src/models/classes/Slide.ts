export default class Slide {
    container;
    elements;
    controls;
    timer;
  constructor(
    container: Element,
    elements: Element[],
    controls: Element,
    timer: number = 5000
  ) {
    this.container = container;
    this.elements = elements;
    this.controls = controls;
    this.timer = timer;
  }
}
