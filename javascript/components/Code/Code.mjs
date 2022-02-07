import Slide from '../Slide/Slide.mjs';
const CSS_URL = new URL('./Code.css', import.meta.url).href;
const templateHTML = () => {
  return `<style>@import "${CSS_URL}";</style>
  <slot></slot>`;
};

class Code extends Slide {
  constructor() {
    super({
      slot: templateHTML
    });

    if (this.dataset.code) {
      this.style.fontSize = `${this.dataset.code}px`;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const javascriptCodeNode = this.shadowRoot.querySelector('slot').assignedElements();
    Prism.highlightElement(javascriptCodeNode[0]);
  }
}
      
customElements.define('ex-code', Code);

export default Code;