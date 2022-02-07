import Slide from '../Slide/Slide.mjs';
const CSS_URL = new URL('./Columns.css', import.meta.url).href;
const slots = {
  2: '<slot name="left"></slot><slot name="right"></slot>',
  3: '<slot name="column-1"></slot><slot name="column-2"></slot><slot name="column-3"></slot>',
  4: '<slot name="column-1"></slot><slot name="column-2"></slot><slot name="column-3"></slot><slot name="column-4"></slot>',
};
const templateHTML = ({dataset} = {}) => {
  const columnCount = Math.min(Math.max(parseInt(dataset?.columns || '2'), 2), 4);
  return `<style>@import "${CSS_URL}";</style>
${slots[columnCount]}`;
};

class Columns extends Slide {
  constructor() {
    super({
      slot: templateHTML
    });
  }
}
      
customElements.define('ex-columns', Columns);

export default Columns;