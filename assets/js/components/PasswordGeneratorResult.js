export default class PasswordGeneratorResult extends HTMLElement {
  constructor() {
    self = super();
  }

  connectedCallback() {
    this.resultInput = self.querySelector("#id_result");
    this.copyIcon = self.querySelector(".copy-icon");
    this.copySuccessEl = self.querySelector(".copy-success");
    this.registerListeners();
  }

  registerListeners() {
    document.addEventListener("passwordGenerated", (event) => {
      console.log(event.detail.password);
      this.resultInput.value = event.detail.password;
    });
    this.copyIcon.addEventListener("click", (event) =>
      this.handleCopyIconClick(event)
    );
  }

  handleCopyIconClick(e) {
    if (this.resultInput.value === "") return;
    this.copyToClipboard(this.resultInput.value).then(() => {
      this.copySuccessEl.classList.add("copied");
      setTimeout(() => {
        this.copySuccessEl.classList.remove("copied");
      }, 1000);
    });
  }

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
}
