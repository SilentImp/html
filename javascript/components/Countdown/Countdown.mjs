import { ClassNames } from "../../Selectors.mjs";
import StateURL from "/html/javascript/StateURL.mjs";

const templateHTML = `
  <style>@import "/html/javascript/components/Countdown/Countdown.css";</style>
  <meter
    min="0"
    max="100"
    low="33"
    high="66"
    optimum="0"
    value="50"
  ></meter>
`;

const errorMessages = {
  TIME_FORMAT_INCORRECT: 'Start time is incorrect',
  TIMER_END_IS_IN_THE_PAST: 'Timer end time in the past',
  NO_DURATION: 'Duration should be a defined',
  PROGRESS_BAR_NOT_FOUND: 'Progress bar not found',
};

const selectors = {
  template: 'template',
  meter: 'meter',
};

const attributes = {
  starts: 'starts',
  duration: 'duration',
  relative: 'relative',
  showInList: 'show-in-list',
  rushFor: 'rush-for',
  rushForCritical: 'rush-for-critical',
  lateFor: 'late-for',
  lateForCritical: 'late-for-critical',
}

const defaults = {
  rushFor: 30,
  rushForCritical: 50,
  lateFor: 10,
  lateForCritical: 20,
}

const MINUTES = 60000;

class ExgibitonistCountdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.total = Infinity;
    this.current = 0;
    this.supportHostContext = CSS.supports('selector(:host-context(*))');

    const template = document.createElement('TEMPLATE');
    template.innerHTML = templateHTML;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.meter = this.shadowRoot.querySelector(selectors.meter);
    this.calculate = this.calculate.bind(this);
    this.fullScreenChange = this.fullScreenChange.bind(this);
    this.selectSlide = this.selectSlide.bind(this);
    this.setTotal = this.setTotal.bind(this);

    window[Symbol.for("SlideMessanger")].register('slidecontroller:fullscreenchange', this.fullScreenChange);
  }

  setTotal(event) {
    this.total = event?.detail?.slideTotal;
  }

  selectSlide (event) {
    this.current = event?.detail?.slideNumber;
  }

  static get observedAttributes() { return ['optimum']; }

  fullScreenChange(event) {
    if (event?.detail?.force || this.showInList) requestAnimationFrame(this.calculate);
    if (!this.supportHostContext) {
      this.classList.toggle(ClassNames.fullscreen, event?.detail?.force);
    }
  }

  connectedCallback() {
    const durationString = this.getAttribute(attributes.duration);
    const startsString = this.getAttribute(attributes.starts);
    const currentTime = +Date.now();
    const startsTime = +(new Date(startsString));
    if (isNaN(startsTime) && startsString !== null) throw new Error(errorMessages.TIME_FORMAT_INCORRECT);
    const duration = parseInt(durationString);
    if (isNaN(duration)) throw new Error(errorMessages.NO_DURATION);
    if ((startsString !== null) && ((startsTime + duration * MINUTES) < currentTime)) throw new Error(errorMessages.TIMER_END_IS_IN_THE_PAST);
    this.startTime = startsTime || currentTime;
    this.duration = duration * MINUTES;
    this.showInList = this.hasAttribute(attributes.showInList);

    this.showInRelativeMode = this.hasAttribute(attributes.relative);
    if (this.showInRelativeMode) {
      this.rushFor = this.getAttribute(attributes.rushFor) ?? defaults.rushFor;
      this.rushForCritical = this.getAttribute(attributes.rushForCritical) ?? defaults.rushForCritical;
      this.lateFor = this.getAttribute(attributes.lateFor) ?? defaults.lateFor;
      this.lateForCritical = this.getAttribute(attributes.lateForCritical) ?? defaults.lateForCritical;
    }

    window[Symbol.for("SlideMessanger")].register('slidecontroller:total', this.setTotal);
    window[Symbol.for("SlideMessanger")].register('slidecontroller:select', this.selectSlide);

    if (StateURL.fullscreen || this.showInList) requestAnimationFrame(this.calculate);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.meter.setAttribute(name, newValue);
  }

  updateRelativeLimits(slidesPercent, timePercent) {
    if (timePercent > slidesPercent) {
      this.updateRushLimits(slidesPercent);
    } else {
      this.updateLateLimits(slidesPercent);
    }
  }

  updateRushLimits(slidesPercent) {
    const high = Math.min(slidesPercent + this.rushForCritical, 100);
    const low = Math.min(slidesPercent + this.rushFor, high);
    this.updateLimits(low, high, slidesPercent);
  }

  updateLateLimits(slidesPercent) {
    const low = Math.max(slidesPercent - this.lateForCritical, 0);
    const high = Math.max(slidesPercent - this.lateFor, low);
    this.updateLimits(low, high, slidesPercent);
  }

  updateLimits(low, high, optimum) {
    if (Math.abs(this.meter.getAttribute('optimum') - optimum) > 1) this.meter.setAttribute('optimum', optimum);
    if (Math.abs(this.meter.getAttribute('low') - low) > 1) this.meter.setAttribute('low', low);
    if (Math.abs(this.meter.getAttribute('high') - high) > 1) this.meter.setAttribute('high', high);
  }

  calculate() {
    const passed = +Date.now() - this.startTime;
    const percent = Math.max(100*passed/this.duration, 0);
    this.meter.value = percent;

    if (this.showInRelativeMode) {
      const slidesPercent = Math.floor(this.current*100/this.total);
      this.updateRelativeLimits(slidesPercent, Math.floor(percent));
    }

    if (passed < this.duration && (StateURL.fullscreen || this.showInList)) {
      requestAnimationFrame(this.calculate);
    }
  }
}

window.customElements.define('ex-countdown', ExgibitonistCountdown);
