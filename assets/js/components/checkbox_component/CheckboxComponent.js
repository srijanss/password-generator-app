import css from "./CheckboxComponent.css?inline";

export default class CheckboxComponent extends HTMLElement {
  constructor() {
    super();
    this.addEventListener("click", (e) => this._onClick(e));
    this._internals = this.attachInternals();
  }

  get checked() {
    return this._internals.states.has("checked");
  }

  set checked(flag) {
    if (flag) {
      this._internals.states.add("checked");
    } else {
      this._internals.states.delete("checked");
    }
  }

  _onClick(event) {
    this.checked = !this.checked;
  }

  // static isStateSyntaxSupported() {
  //   return CSS.supports("selector(:state(checked))");
  // }

  connectedCallback() {
    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        ${css} 
      </style>
      <div class="checkbox">
        <svg width="14" height="12" xmlns="http://www.w3.org/2000/svg" aria-labelledfor="check-svg-icon-title" role="img" focusable="false">
          <title id="check-svg-icon-title">Check Icon</title>
          <path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8"/>
        </svg>
      </div>
      <slot></slot>
    `;
  }
}
