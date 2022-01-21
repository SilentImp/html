const templateHTML = ({
  slot = '<slot></slot>',
  caption,
}) => `
<style>@import "/html/javascript/components/Slide/Slide.css";</style>
<figure class="exgibitionist-slide__content">
  ${slot}
  ${(caption !== null && caption !== undefined) ? `<figcaption>${caption}</figcaption>` : ''}
</figure>
<button 
  class="exgibitionist-slide__select-slide" 
  type="button">Select slide</button>
`;

class ExgibitonistSlide extends HTMLElement {
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
    this.button = this.shadowRoot.querySelector('.exgibitionist-slide__select-slide');
    this.button.addEventListener('click', this.selectSlide);
    if (this.dataset.number) {
      this.button.appendChild(document.createTextNode(` № ${this.dataset.number}`));
    }

    window[Symbol.for("SlideMessanger")].register('slidecontroller:change', this.checkFocus);
  }

}
      
customElements.define('ex-slide', ExgibitonistSlide);

export default ExgibitonistSlide;