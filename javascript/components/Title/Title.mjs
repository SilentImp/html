import ExgibitonistSlide from '/html/javascript/components/Slide/Slide.mjs';

const templateHTML = ({dataset} = {}) => {
  const level = Math.min(Math.max(parseInt(dataset?.level || '1'), 1), 6);
  return `<style>@import "/html/javascript/components/Title/Title.css";</style>
<h${level}><slot></slot></h${level}>`;
};

class ExgibitonistTitle extends ExgibitonistSlide {
  constructor() {
    super({
      slot: templateHTML
    });
  }
}
      
customElements.define('ex-title', ExgibitonistTitle);

export default ExgibitonistTitle;