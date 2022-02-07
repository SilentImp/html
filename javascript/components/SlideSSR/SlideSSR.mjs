class SlideSSR extends HTMLElement {
  constructor() {
    super();

    this.selectSlide = this.selectSlide.bind(this);
    this.checkFocus = this.checkFocus.bind(this);
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
      
customElements.define('ex-slide-ssr', SlideSSR);

export default SlideSSR;