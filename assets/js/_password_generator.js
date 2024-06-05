export default class PasswordGenerator {
  constructor(options) {
    this.uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    this.numbers = "0123456789";
    this.symbols = "!@#\\$%\\^&\\*\\(\\)-\\+=<>\\?/\\{\\}\\[\\]_";
    this.passwordLength = 0;
    this.includeUppercase = false;
    this.includeLowercase = false;
    this.includeNumbers = false;
    this.includeSymbols = false;
    this.characterSet = "";
    this.init(options);
  }

  init(options) {
    if (options) {
      this.passwordLength = options.passwordLength || 0;
      this.includeUppercase = options.includeUppercase;
      this.includeLowercase = options.includeLowercase;
      this.includeNumbers = options.includeNumbers;
      this.includeSymbols = options.includeSymbols;
    } else {
      this.passwordLength = 10;
      this.includeUppercase = true;
      this.includeLowercase = false;
      this.includeNumbers = false;
      this.includeSymbols = false;
    }
    this.setCharacterSets();
  }

  setCharacterSets() {
    this.characterSet = this.includeUppercase ? this.uppercaseLetters : "";
    this.characterSet += this.includeLowercase ? this.lowercaseLetters : "";
    this.characterSet += this.includeNumbers ? this.numbers : "";
    this.characterSet += this.includeSymbols
      ? this.symbols.replace(/\\/g, "")
      : "";
  }

  getPasswordStrengthBasedOnRegex(password) {
    const hasUppercaseLettersRegex = new RegExp(`[${this.uppercaseLetters}]`);
    const hasLowercaseLettersRegex = new RegExp(`[${this.lowercaseLetters}]`);
    const hasNumbersRegex = new RegExp(`[${this.numbers}]`);
    const hasSymbolsRegex = new RegExp(`[${this.symbols}]`);
    let strength = 0;
    if (password.length > 8) strength += 1;
    if (password.match(hasUppercaseLettersRegex)) strength += 1;
    if (password.match(hasLowercaseLettersRegex)) strength += 1;
    if (password.match(hasNumbersRegex)) strength += 1;
    if (password.match(hasSymbolsRegex)) strength += 2;
    return strength;
  }

  getPasswordStrength(password) {
    const strength = this.getPasswordStrengthBasedOnRegex(password);
    if (strength === 1) {
      return { className: "too-weak", label: "Too weak!" };
    } else if (strength === 2) {
      return { className: "weak", label: "Weak" };
    } else if (strength === 3) {
      return { className: "medium", label: "Medium" };
    } else if (strength >= 4) {
      return { className: "strong", label: "Strong" };
    } else {
      return { className: "", label: "" };
    }
  }

  generatePassword() {
    const result = {
      password: "",
      strength: null,
    };

    if (this.characterSet === "") return result;

    for (let i = 0; i < this.passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * this.characterSet.length);
      result.password += this.characterSet[randomIndex];
    }

    result.strength = this.getPasswordStrength(result.password);
    return result;
  }
}
