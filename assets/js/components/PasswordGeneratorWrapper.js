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
    this.passwordStrengthLabel = self.querySelector(".strength-meter__label");
    this.passwordStrengthMeter = self.querySelector(".strength-meter");
    this.registerListeners();
  }

  registerListeners() {
    this.form.addEventListener("submit", (e) => e.preventDefault());
    this.generateBtn.addEventListener("click", (event) =>
      this.handleGenerateBtnClick(event)
    );
    document.addEventListener("sliderchange", (event) =>
      this.handlePasswordLengthChange(event)
    );
  }

  getRangeValueFromPercentage(event) {
    const percentageChange = event.detail.percentage;
    const maxRange = this.passwordLengthInput.max;
    return Math.round((maxRange * percentageChange) / 100);
  }

  handlePasswordLengthChange(event) {
    const rangeValue = this.getRangeValueFromPercentage(event);
    this.passwordLengthInput.value = rangeValue;
    this.passwordLengthOutput.textContent = rangeValue;
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
    this.passwordStrengthLabel.textContent = result.strength.label;
    if (
      this.passwordStrengthMeter.classList.contains(
        this.currentPasswordStrength
      )
    ) {
      this.passwordStrengthMeter.classList.remove(this.currentPasswordStrength);
    }
    this.passwordStrengthMeter.classList.add(result.strength.className);
    this.currentPasswordStrength = result.strength.className;
  }

  dispatchPasswordGeneratedEvent(password) {
    const passwordGeneratedEvent = new CustomEvent("passwordGenerated", {
      detail: {
        password,
      },
    });
    document.dispatchEvent(passwordGeneratedEvent);
  }
}
