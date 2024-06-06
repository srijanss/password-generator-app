import css from "./RangeSliderComponent.css?inline";

export default class RangeSliderComponent extends HTMLElement {
  constructor() {
    self = super();
  }

  connectedCallback() {
    this.render();
    this.sliderThumb = this.shadowRoot.querySelector(".slider-thumb");
    this.sliderTrack = this.shadowRoot.querySelector(".slider-track");
    this.sliderThumbDiameter = parseInt(
      getComputedStyle(this.sliderThumb).getPropertyValue("--thumb-size")
    );
    this.offsetX = this.sliderThumbDiameter / 2;
    this.isDragging = false;
    this.startX = this.sliderTrack.getBoundingClientRect().left;
    this.endX =
      this.sliderTrack.getBoundingClientRect().right - this.sliderThumbDiameter;
    this.registerListeners();
  }

  render() {
    const shadown = this.attachShadow({ mode: "open" });
    shadown.innerHTML = `
      <style>
        ${css}
      </style>
      <div class="slider-track">
        <div class="slider-thumb"></div>
      </div>
    `;
  }

  registerListeners() {
    this.sliderThumb.addEventListener("mousedown", (event) =>
      this.handleDragStart(event)
    );
    this.sliderThumb.addEventListener("touchstart", (event) =>
      this.handleDragStart(event)
    );
    document.addEventListener("mousemove", (event) =>
      this.handleDragMove(event)
    );
    this.sliderThumb.addEventListener("touchmove", (event) =>
      this.handleDragMove(event)
    );

    document.addEventListener("mouseup", (event) => this.handleDragEnd(event));
    document.addEventListener("touchend", (event) => this.handleDragEnd(event));
  }

  handleDragStart(event) {
    event.preventDefault();
    this.isDragging = true;
    document.body.style.userSelect = "none";
  }

  handleDragMove(event) {
    if (event.changedTouches) {
      event.clientX = event.changedTouches[0].clientX;
    }
    if (this.isDragging) {
      const position = event.clientX;
      if (
        position >= this.startX + this.offsetX &&
        position <= this.endX + this.offsetX
      ) {
        const trackCrossSize = position - this.startX - this.offsetX;
        this.sliderThumb.style.left = `${trackCrossSize}px`;
        this.sliderTrack.style.setProperty(
          "--track-cross-size",
          `${trackCrossSize}px`
        );
      }
    }
  }

  handleDragEnd(event) {
    this.isDragging = false;
    document.body.style.userSelect = "";
  }
}
