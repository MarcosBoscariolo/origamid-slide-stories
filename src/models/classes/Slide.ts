import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  timer: number;
  index: number;
  slide: Element;
  timeout: Timeout | null;
  paused: boolean;
  pausedTimeout: Timeout | null;
  thumbItems: HTMLElement[] | null;
  thumb: HTMLElement | null;

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
    this.index = localStorage.getItem("activeSlide")
      ? Number(localStorage.getItem("activeSlide"))
      : 0;
    this.slide = this.slides[this.index];
    this.timeout = null;
    this.paused = false;
    this.pausedTimeout = null;
    this.thumbItems = null;
    this.thumb = null;

    this.onInit();
  }

  private onInit() {
    this.addControls();
    this.addThumbItems();
    this.showSlide(this.index);
  }

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "Slide anterior";
    nextButton.innerText = "Próximo slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    this.controls.addEventListener("pointerdown", () => this.pause());
    document.addEventListener("pointerup", () => this.continue());
    document.addEventListener("toutchend", () => this.continue());
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    prevButton.addEventListener("pointerup", () => this.prev());
    nextButton.addEventListener("pointerup", () => this.next());
  }

  pause() {
    document.body.classList.add("paused");
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause();
      this.paused = true;
      this.thumb?.classList.add("paused");
      if (this.slide instanceof HTMLVideoElement) this.slide.pause();
    }, 200);
  }

  continue() {
    document.body.classList.remove("paused");
    this.pausedTimeout?.clear();
    if (this.paused) {
      this.paused = false;
      this.timeout?.continue();
      this.thumb?.classList.remove("paused");
      if (this.slide instanceof HTMLVideoElement) this.slide.play();
    }
  }

  prev() {
    if (this.paused) return;
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.showSlide(prev);
  }

  next() {
    if (this.paused) return;
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.showSlide(next);
  }

  hide(element: Element) {
    element.classList.remove("active");
    if (element instanceof HTMLVideoElement) {
      element.currentTime = 0;
      element.pause();
    }
  }

  showSlide(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];

    localStorage.setItem("activeSlide", String(this.index));

    if (this.thumbItems) {
      this.thumb = this.thumbItems[this.index];
      this.thumbItems.forEach((element) => element.classList.remove("active"));
      this.thumb.classList.add("active");
    }

    this.slides.forEach((slide) => this.hide(slide));
    this.slides[index].classList.add("active");
    if (this.slide instanceof HTMLVideoElement) {
      this.autoVideo(this.slide);
    } else {
      this.auto(this.timer);
    }
  }

  autoVideo(video: HTMLVideoElement) {
    video.muted = true;
    video.play();
    let firstPlay = true;
    video.addEventListener("playing", () => {
      if (firstPlay) this.auto(video.duration * 1000);
      firstPlay = false;
    });
  }

  auto(timer: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), timer);
    if (this.thumb) this.thumb.style.animationDuration = `${timer}ms`;
  }

  private addThumbItems() {
    const thumbContainer = document.createElement("div");
    thumbContainer.id = "slide-thumb";
    for (let i = 0; i < this.slides.length; i++) {
      thumbContainer.innerHTML += `<span><span class="thumb-item"></span></span>`;
    }
    this.controls.appendChild(thumbContainer);
    this.thumbItems = Array.from(document.querySelectorAll(".thumb-item"));
  }
}
