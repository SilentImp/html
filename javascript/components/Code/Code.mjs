import ExgibitonistSlide from '/html/javascript/components/Slide/Slide.mjs';

const templateHTML = ({dataset} = {}) => {
  // const line = dataset.line ? ` data-line="${dataset.line}"` : '';
  // const language = dataset.language ? `class="language-${dataset.language}"` : '';
  // const codeDataSet = [line];
  return `<style>@import "/html/javascript/components/Code/Code.css";</style>
  <slot></slot>`;
};

class ExgibitonistCode extends ExgibitonistSlide {
  constructor() {
    super({
      slot: templateHTML
    });

    if (this.dataset.code) {
      this.style.fontSize = `${this.dataset.code}px`;
    }
  }
}
      
customElements.define('ex-code', ExgibitonistCode);

export default ExgibitonistCode;