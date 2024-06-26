import css from "./RangeSliderComponent.css?inline";

export default class RangeSliderComponent extends HTMLElement {
  constructor() {
    self = super();
  }

  get trackWidth() {
    return this._trackWidth;
  }

  set trackWidth(value) {
    this._trackWidth = value;
  }

  get trackCrossSize() {
    return this._trackCrossSize;
  }

  set trackCrossSize(value) {
    this._trackCrossSize = value;
    this.dispatchSliderChangeEvent();
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
    this.startX = this.getTrackStartXPosition();
    this.endX = this.getTrackEndXPosition();
    this.trackWidth = this.sliderTrack.getBoundingClientRect().width;
    this.trackCrossSize = 0;
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
    window.addEventListener("resize", (event) =>
      this.handleWindowResize(event)
    );
  }

  getTrackStartXPosition() {
    return this.sliderTrack.getBoundingClientRect().left;
  }
  getTrackEndXPosition() {
    return (
      this.sliderTrack.getBoundingClientRect().right - this.sliderThumbDiameter
    );
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
        this.trackCrossSize = position - this.startX - this.offsetX;
        this.sliderThumb.style.left = `${this.trackCrossSize}px`;
        this.sliderTrack.style.setProperty(
          "--track-cross-size",
          `${this.trackCrossSize + 5}px`
        );
      }
    }
  }

  handleDragEnd(event) {
    this.isDragging = false;
    document.body.style.userSelect = "";
  }

  calculateTrackCrossPercentage() {
    const x =
      this.trackCrossSize > this.trackWidth / 2 ? this.sliderThumbDiameter : 0;
    return Math.ceil(((this.trackCrossSize + x) / this.trackWidth) * 100);
  }

  handleWindowResize(event) {
    this.startX = this.getTrackStartXPosition();
    this.endX = this.getTrackEndXPosition();
  }

  dispatchSliderChangeEvent() {
    const trackCrossSizePercentage = this.calculateTrackCrossPercentage();
    const event = new CustomEvent("sliderchange", {
      detail: { percentage: trackCrossSizePercentage },
    });
    document.dispatchEvent(event);
  }
}
