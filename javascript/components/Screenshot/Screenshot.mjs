import ExgibitonistSlide from '/html/javascript/components/Slide/Slide.mjs';

const templateHTML = ({dataset} = {}) => {
  return `<style>@import "/html/javascript/components/Screenshot/Screenshot.css";</style>
<img src="${dataset.src}" alt="${dataset.alt}" />`;
};

class ExgibitonistScreenshot extends ExgibitonistSlide {
  constructor() {
    super({
      slot: templateHTML
    });
  }
}

customElements.define('ex-screen', ExgibitonistScreenshot);

export default ExgibitonistScreenshot;