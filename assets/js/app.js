import PasswordGeneratorWrapper from "./components/PasswordGeneratorWrapper";
import PasswordGeneratorResult from "./components/PasswordGeneratorResult";
import CheckboxComponent from "./components/checkbox_component/CheckboxComponent.js";
import RangeSliderComponent from "./components/range_slider_component/RangeSliderComponent.js";

customElements.define("password-generator-wrapper", PasswordGeneratorWrapper);
customElements.define("password-generator-result", PasswordGeneratorResult);
customElements.define("custom-checkbox", CheckboxComponent);
customElements.define("custom-range-slider", RangeSliderComponent);
