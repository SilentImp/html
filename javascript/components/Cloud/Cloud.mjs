const CSS_URL = new URL('./Cloud.css', import.meta.url).href;
const templateHTML = `<style>@import "${CSS_URL}";</style>
<section class="cloud"><slot></slot></section>`;

class Cloud extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const template = document.createElement('TEMPLATE');
    template.innerHTML = templateHTML;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    if (this.dataset.left) this.style.setProperty('--left', this.dataset.left);
    if (this.dataset.top) this.style.setProperty('--top', this.dataset.top);
    if (this.dataset.size) this.style.setProperty('--font-size', this.dataset.size);
  }
}
      
customElements.define('ex-cloud', Cloud);

export default Cloud;