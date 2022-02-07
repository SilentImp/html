import { ClassNames } from "../../Selectors.mjs";
const CSS_URL = new URL('./Progress.css', import.meta.url).href;
const templateHTML = `
<style>@import "${CSS_URL}";</style>
<progress></progress>
`;

class ExgibitonistProgress extends HTMLElement {
  constructor() {
    super();
    this.progressBar = null;
    this.current = 0;
    this.total = Infinity;
    this.supportHostContext = CSS.supports('selector(:host-context(*))');

    this.attachShadow({mode: 'open'});
    const template = document.createElement('TEMPLATE');
    template.innerHTML = templateHTML;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.updateProgress = this.updateProgress.bind(this);
    this.selectSlide = this.selectSlide.bind(this);
    this.setTotal = this.setTotal.bind(this);
    this.fullScreenChange = this.fullScreenChange.bind(this);

    if (!this.supportHostContext) {
      // window[Symbol.for("SlideMessanger")].register('slidecontroller:fullscreenchange', this.fullScreenChange);
    }
  }

  fullScreenChange(event) {
    this.classList.toggle(ClassNames.fullscreen, event?.detail?.force);
  }

  setTotal(event) {
    this.total = event?.detail?.slideTotal;
    this.updateProgress();
  }

  selectSlide (event) {
    this.current = event?.detail?.slideNumber;
    this.updateProgress();
  }

  // update state of slide progress bar
  updateProgress () {
    this.progressBar.setAttribute("max", this.total - 1);
    this.progressBar.setAttribute("value", this.current);
    this.progressBar.innerHTML = `${this.current}/${this.total}`;
  }

  connectedCallback () {
    this.progressBar = this.shadowRoot.querySelector('progress');
    this.updateProgress();
    // window[Symbol.for("SlideMessanger")].register('slidecontroller:total', this.setTotal);
    // window[Symbol.for("SlideMessanger")].register('slidecontroller:select', this.selectSlide);
  }
}

customElements.define('ex-progress', ExgibitonistProgress);

export default ExgibitonistProgress;