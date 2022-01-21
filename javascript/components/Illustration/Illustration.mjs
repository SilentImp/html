import ExgibitonistSlide from '/html/javascript/components/Slide/Slide.mjs';

const templateHTML = ({dataset} = {}) => {
  return `<style>@import "/html/javascript/components/Illustration/Illustration.css";</style>
<img src="${dataset.src}" alt="${dataset.alt}" />
<slot></slot>`;
};

class ExgibitonistIllustration extends ExgibitonistSlide {
  constructor() {
    super({
      slot: templateHTML
    });
  }
}

customElements.define('ex-illustration', ExgibitonistIllustration);

export default ExgibitonistIllustration;