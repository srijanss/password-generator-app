(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class o{constructor(e){this.uppercaseLetters="ABCDEFGHIJKLMNOPQRSTUVWXYZ",this.lowercaseLetters="abcdefghijklmnopqrstuvwxyz",this.numbers="0123456789",this.symbols="!@#\\$%\\^&\\*\\(\\)-\\+=<>\\?/\\{\\}\\[\\]_",this.passwordLength=0,this.includeUppercase=!1,this.includeLowercase=!1,this.includeNumbers=!1,this.includeSymbols=!1,this.characterSet="",this.init(e)}init(e){e?(this.passwordLength=e.passwordLength||0,this.includeUppercase=e.includeUppercase,this.includeLowercase=e.includeLowercase,this.includeNumbers=e.includeNumbers,this.includeSymbols=e.includeSymbols):(this.passwordLength=10,this.includeUppercase=!0,this.includeLowercase=!1,this.includeNumbers=!1,this.includeSymbols=!1),this.setCharacterSets()}setCharacterSets(){this.characterSet=this.includeUppercase?this.uppercaseLetters:"",this.characterSet+=this.includeLowercase?this.lowercaseLetters:"",this.characterSet+=this.includeNumbers?this.numbers:"",this.characterSet+=this.includeSymbols?this.symbols.replace(/\\/g,""):""}getPasswordStrengthBasedOnRegex(e){const t=new RegExp(`[${this.uppercaseLetters}]`),i=new RegExp(`[${this.lowercaseLetters}]`),s=new RegExp(`[${this.numbers}]`),r=new RegExp(`[${this.symbols}]`);let a=0;return e.length>8&&(a+=1),e.match(t)&&(a+=1),e.match(i)&&(a+=1),e.match(s)&&(a+=1),e.match(r)&&(a+=2),a}getPasswordStrength(e){const t=this.getPasswordStrengthBasedOnRegex(e);return t===1?{className:"too-weak",label:"Too weak!"}:t===2?{className:"weak",label:"Weak"}:t===3?{className:"medium",label:"Medium"}:t>=4?{className:"strong",label:"Strong"}:{className:"",label:""}}generatePassword(){const e={password:"",strength:null};if(this.characterSet==="")return e;for(let t=0;t<this.passwordLength;t++){const i=Math.floor(Math.random()*this.characterSet.length);e.password+=this.characterSet[i]}return e.strength=this.getPasswordStrength(e.password),e}}class c extends HTMLElement{constructor(){self=super(),this.currentPasswordStrength=""}connectedCallback(){this.form=self.querySelector("form"),this.passwordLengthInput=this.form.querySelector("#id_password_length"),this.passwordLengthOutput=this.form.querySelector(".password-length-value"),this.passwordOptions=this.form.querySelectorAll("input[name='password-options']"),this.generateBtn=this.form.querySelector("button[type='submit']"),this.passwordStrengthLabel=self.querySelector(".strength-meter__label"),this.passwordStrengthMeter=self.querySelector(".strength-meter"),this.registerListeners()}registerListeners(){this.form.addEventListener("submit",e=>e.preventDefault()),this.generateBtn.addEventListener("click",e=>this.handleGenerateBtnClick(e)),document.addEventListener("sliderchange",e=>this.handlePasswordLengthChange(e))}getRangeValueFromPercentage(e){const t=e.detail.percentage,i=this.passwordLengthInput.max;return Math.round(i*t/100)}handlePasswordLengthChange(e){const t=this.getRangeValueFromPercentage(e);this.passwordLengthInput.value=t,this.passwordLengthOutput.textContent=t}handleGenerateBtnClick(e){const i=new o({passwordLength:parseInt(this.passwordLengthInput.value),includeUppercase:this.passwordOptions[0].checked,includeLowercase:this.passwordOptions[1].checked,includeNumbers:this.passwordOptions[2].checked,includeSymbols:this.passwordOptions[3].checked}).generatePassword();i.password&&(this.dispatchPasswordGeneratedEvent(i.password),this.updatePasswordStrengthMeter(i))}updatePasswordStrengthMeter(e){this.passwordStrengthLabel.textContent=e.strength.label,this.passwordStrengthMeter.classList.contains(this.currentPasswordStrength)&&this.passwordStrengthMeter.classList.remove(this.currentPasswordStrength),this.passwordStrengthMeter.classList.add(e.strength.className),this.currentPasswordStrength=e.strength.className}dispatchPasswordGeneratedEvent(e){const t=new CustomEvent("passwordGenerated",{detail:{password:e}});document.dispatchEvent(t)}}class h extends HTMLElement{constructor(){self=super()}connectedCallback(){this.resultInput=self.querySelector("#id_result"),this.copyIcon=self.querySelector(".copy-icon"),this.copySuccessEl=self.querySelector(".copied-text"),this.registerListeners()}registerListeners(){document.addEventListener("passwordGenerated",e=>{this.resultInput.value=e.detail.password}),this.copyIcon.addEventListener("click",e=>this.handleCopyIconClick(e))}handleCopyIconClick(e){this.resultInput.value!==""&&this.copyToClipboard(this.resultInput.value).then(()=>{this.copySuccessEl.classList.add("success"),setTimeout(()=>{this.copySuccessEl.classList.remove("success")},1e3)})}async copyToClipboard(e){try{await navigator.clipboard.writeText(e)}catch(t){console.error("Failed to copy: ",t)}}}const d="*,:after,:before{box-sizing:border-box;margin:0;padding:0}:host{display:-webkit-box;display:-ms-flexbox;display:flex;font-size:16px;gap:20px;line-height:21px}:host .checkbox{--checkbox-size:20px;border:2px solid var(--color-white);cursor:pointer;height:20px;height:var(--checkbox-size);width:20px;width:var(--checkbox-size)}:host .checkbox *{display:none}@media (min-width:768px){:host{font-size:18px;gap:24px;line-height:23px}}:host(:state(checked)) .checkbox{align-items:center;background-color:var(--color-primary);border:none;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:center}:host(:state(checked)) .checkbox *{display:block}";class l extends HTMLElement{constructor(){super(),this.addEventListener("click",e=>this._onClick(e)),this._internals=this.attachInternals()}get checked(){return this._internals.states.has("checked")}set checked(e){e?this._internals.states.add("checked"):this._internals.states.delete("checked")}_onClick(e){this.checked=!this.checked}connectedCallback(){this.render()}render(){const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>
        ${d} 
      </style>
      <div class="checkbox">
        <svg width="14" height="12" xmlns="http://www.w3.org/2000/svg" aria-labelledfor="check-svg-icon-title" role="img" focusable="false">
          <title id="check-svg-icon-title">Check Icon</title>
          <path stroke="#18171F" stroke-width="3" fill="none" d="M1 5.607 4.393 9l8-8"/>
        </svg>
      </div>
      <slot></slot>
    `}}const u='*,:after,:before{box-sizing:border-box;margin:0;padding:0}:host{--custom-slider-height:28px;align-items:center;display:grid;height:28px;height:var(--custom-slider-height)}:host .slider-track{--track-cross-size:0px;background-color:var(--color-very-dark-grey);height:8px;position:relative;width:100%}:host .slider-track:before{background-color:var(--color-primary);content:"";height:100%;left:0;position:absolute;top:0;width:var(--track-cross-size)}:host .slider-thumb{--thumb-size:var(--custom-slider-height,28px);background-color:var(--color-white);border-radius:50%;height:28px;height:var(--thumb-size);left:0;position:absolute;top:calc(50% - 14px);top:calc(50% - var(--thumb-size)/2);width:28px;width:var(--thumb-size)}:host .slider-thumb:hover{background-color:var(--color-very-dark-grey);border:2px solid var(--color-primary);cursor:pointer}';class g extends HTMLElement{constructor(){self=super()}get trackWidth(){return this._trackWidth}set trackWidth(e){this._trackWidth=e}get trackCrossSize(){return this._trackCrossSize}set trackCrossSize(e){this._trackCrossSize=e,this.dispatchSliderChangeEvent()}connectedCallback(){this.render(),this.sliderThumb=this.shadowRoot.querySelector(".slider-thumb"),this.sliderTrack=this.shadowRoot.querySelector(".slider-track"),this.sliderThumbDiameter=parseInt(getComputedStyle(this.sliderThumb).getPropertyValue("--thumb-size")),this.offsetX=this.sliderThumbDiameter/2,this.isDragging=!1,this.startX=this.getTrackStartXPosition(),this.endX=this.getTrackEndXPosition(),this.trackWidth=this.sliderTrack.getBoundingClientRect().width,this.trackCrossSize=0,this.registerListeners()}render(){const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>
        ${u}
      </style>
      <div class="slider-track">
        <div class="slider-thumb"></div>
      </div>
    `}registerListeners(){this.sliderThumb.addEventListener("mousedown",e=>this.handleDragStart(e)),this.sliderThumb.addEventListener("touchstart",e=>this.handleDragStart(e)),document.addEventListener("mousemove",e=>this.handleDragMove(e)),this.sliderThumb.addEventListener("touchmove",e=>this.handleDragMove(e)),document.addEventListener("mouseup",e=>this.handleDragEnd(e)),document.addEventListener("touchend",e=>this.handleDragEnd(e)),window.addEventListener("resize",e=>this.handleWindowResize(e))}getTrackStartXPosition(){return this.sliderTrack.getBoundingClientRect().left}getTrackEndXPosition(){return this.sliderTrack.getBoundingClientRect().right-this.sliderThumbDiameter}handleDragStart(e){e.preventDefault(),this.isDragging=!0,document.body.style.userSelect="none"}handleDragMove(e){if(e.changedTouches&&(e.clientX=e.changedTouches[0].clientX),this.isDragging){const t=e.clientX;t>=this.startX+this.offsetX&&t<=this.endX+this.offsetX&&(this.trackCrossSize=t-this.startX-this.offsetX,this.sliderThumb.style.left=`${this.trackCrossSize}px`,this.sliderTrack.style.setProperty("--track-cross-size",`${this.trackCrossSize+5}px`))}}handleDragEnd(e){this.isDragging=!1,document.body.style.userSelect=""}calculateTrackCrossPercentage(){const e=this.trackCrossSize>this.trackWidth/2?this.sliderThumbDiameter:0;return Math.ceil((this.trackCrossSize+e)/this.trackWidth*100)}handleWindowResize(e){this.startX=this.getTrackStartXPosition(),this.endX=this.getTrackEndXPosition()}dispatchSliderChangeEvent(){const e=this.calculateTrackCrossPercentage(),t=new CustomEvent("sliderchange",{detail:{percentage:e}});document.dispatchEvent(t)}}customElements.define("password-generator-wrapper",c);customElements.define("password-generator-result",h);customElements.define("custom-checkbox",l);customElements.define("custom-range-slider",g);
