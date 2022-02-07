import Slide from '../Slide/Slide.mjs';
const CSS_URL = new URL('./Illustration.css', import.meta.url).href;
const templateHTML = ({dataset} = {}) => {
  return `<style>@import "${CSS_URL}";</style>
<img src="${dataset.src}" alt="${dataset.alt}" />
<slot></slot>`;
};

class Illustration extends Slide {
  constructor() {
    super({
      slot: templateHTML
    });
  }
}

customElements.define('ex-illustration', Illustration);

export default Illustration;