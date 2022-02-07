const CSS_URL = new URL('./QRCode.css', import.meta.url).href;
import Slide from '../Slide/Slide.mjs';
const templateHTML = ({dataset} = {}) => {
  const level = Math.min(Math.max(parseInt(dataset?.level || '1'), 1), 6);
  const qrcode = dataset.qrcode;
  const link = dataset.link;
  const label = dataset.label;
  return `<style>@import "${CSS_URL}";</style>
  <div class="half">
    <div>
      <h${level}><slot></slot></h${level}>
    </div>
  </div>
  <div class="half">
    <img class="qrcode" src="images/${qrcode}" alt="">
    <a data-click target="_blank" data-click href="${link}">${label}</a>
  </div>
`};

class QRCode extends Slide {
  constructor() {
    super({
      slot: templateHTML
    });
  }

}
      
customElements.define('ex-qrcode', QRCode);

export default QRCode;