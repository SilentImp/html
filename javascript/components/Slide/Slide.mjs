const CSS_URL = new URL('./Slide.css', import.meta.url).href;
const templateHTML = ({
  slot = '<slot></slot>',
  caption,
}) => `<style>@import "${CSS_URL}";</style>
<button class="slide__select" type="button">Select slide</button>
<article class="slide">
  <figure class="slide__content">
    <div class="slide__delimiter">
      ${slot}
    </div>
    ${(caption !== null && caption !== undefined) ? `<figcaption class="slide__caption>${caption}</figcaption>` : ''}
  </figure>
</article>`;

class Slide extends HTMLElement {
  constructor(variables = {}) {
    super();

    this.attachShadow({mode: 'open'});

    const executedVariables = Object
      .entries(variables)
      .reduce((collector, [key, value]) => 
        (typeof value === "function")
          ? {
            ...collector,
            [key]: value({
              dataset: this.dataset,
              element: this,
            }),
          }
        : {
          ...collector,
          [key]: value,
        }, {});

    const template = document.createElement('TEMPLATE');
    template.innerHTML = templateHTML({
      caption: this.getAttribute('caption'),
      ...executedVariables
    });

    this.selectSlide = this.selectSlide.bind(this);
    this.checkFocus = this.checkFocus.bind(this);

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  selectSlide() {
    window[Symbol.for("SlideMessanger")].post("slidecontroller:select", {
      detail: {
        slideNumber: parseInt(this.dataset.number),
      },
      bubbles: true,
    });
  }

  checkFocus ({detail: {slideNumber}}) {
    if (slideNumber ===  parseInt(this.dataset.number)) {
      this.button.focus();
    }
  }

  connectedCallback () {
    this.button = this.shadowRoot.querySelector('.slide__select');
    this.button.addEventListener('click', this.selectSlide);

    if (this.dataset.number) {
      const slideNumberText = document.createTextNode(` № ${this.dataset.number}`);
      this.button.appendChild(slideNumberText);
    }

    window[Symbol.for("SlideMessanger")].register('slidecontroller:change', this.checkFocus);
  }

}
      
customElements.define('ex-slide', Slide);

export default Slide;