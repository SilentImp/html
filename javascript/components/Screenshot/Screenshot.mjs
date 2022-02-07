import Slide from '../Slide/Slide.mjs';
const CSS_URL = new URL('./Screenshot.css', import.meta.url).href;
const templateHTML = ({dataset} = {}) => {
  return `<style>@import "${CSS_URL}";</style>
<img src="${dataset.src}" alt="${dataset.alt}" />`;
};

class Screenshot extends Slide {
  constructor() {
    super({
      slot: templateHTML
    });
  }
}

customElements.define('ex-screen', Screenshot);

export default Screenshot;