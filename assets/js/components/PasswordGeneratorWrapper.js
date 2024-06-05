import PasswordGenerator from "../_password_generator";

export default class PasswordGeneratorWrapper extends HTMLElement {
  constructor() {
    self = super();
    this.currentPasswordStrength = "";
  }
  connectedCallback() {
    this.form = self.querySelector("form");
    this.passwordLengthInput = this.form.querySelector("#id_password_length");
    this.passwordLengthOutput = this.form.querySelector(
      ".password-length-value"
    );
    this.passwordOptions = this.form.querySelectorAll(
      "input[name='password-options']"
    );
    this.generateBtn = this.form.querySelector("button[type='submit']");
    this.passwordStrengthBlock = self.querySelector(
      ".password-generator__strength-meter"
    );
    this.passwordStrengthLabel = this.passwordStrengthBlock.querySelector(
      ".strength-meter__label"
    );
    this.registerListeners();
  }

  registerListeners() {
    this.form.addEventListener("submit", (e) => e.preventDefault());
    this.passwordLengthInput.addEventListener("input", (event) =>
      this.handlePasswordLengthChange(event)
    );
    this.generateBtn.addEventListener("click", (event) =>
      this.handleGenerateBtnClick(event)
    );
  }

  handlePasswordLengthChange(event) {
    this.passwordLengthOutput.textContent = event.target.value;
  }

  handleGenerateBtnClick(event) {
    const passwordGenerator = new PasswordGenerator({
      passwordLength: parseInt(this.passwordLengthInput.value),
      includeUppercase: this.passwordOptions[0].checked,
      includeLowercase: this.passwordOptions[1].checked,
      includeNumbers: this.passwordOptions[2].checked,
      includeSymbols: this.passwordOptions[3].checked,
    });
    const result = passwordGenerator.generatePassword();
    if (!result.password) return;
    this.dispatchPasswordGeneratedEvent(result.password);
    this.updatePasswordStrengthMeter(result);
  }

  updatePasswordStrengthMeter(result) {
    this.passwordStrengthLabel.textContent = this.getNameFromSlug(
      result.strength
    );
    if (
      this.passwordStrengthBlock.classList.contains(
        this.currentPasswordStrength
      )
    ) {
      this.passwordStrengthBlock.classList.remove(this.currentPasswordStrength);
    }
    this.passwordStrengthBlock.classList.add(result.strength);
    this.currentPasswordStrength = result.strength;
  }

  dispatchPasswordGeneratedEvent(password) {
    const passwordGeneratedEvent = new CustomEvent("passwordGenerated", {
      detail: {
        password,
      },
    });
    document.dispatchEvent(passwordGeneratedEvent);
  }

  getNameFromSlug(slug) {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}
