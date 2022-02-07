import Keys from "./Keys.mjs";
import { Selectors, ClassNames } from "./Selectors.mjs";
import isTouchDevice from "./isTouchDevice.mjs";
import isElementVisible from "./isElementVisible.mjs";
import Options from "./Options.mjs";
import StateURL from "./StateURL.mjs";

class SlideController {
  static messenger = window[Symbol.for("SlideMessanger")];

  constructor () {
    // Binding this to all class methods
    for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      const method = this[name];
      if (name !== 'constructor' && typeof method === 'function') {
        this[name] = method.bind(this);
      }
    }

    // Default state
    this.slides = null;
    this.container = null;
    this.currentSlide = 0;
    this.totalSlides = Infinity;
    this.isTouchDevice = isTouchDevice();
    this.supportHostContext = CSS.supports('selector(:host-context(*))');

    // Swipe
    this.xDown = null;
    this.yDown = null;

    // Keys
    this.controlsPressed = [];
    this.nextKeys = [Keys.PgDown, Keys.Right, Keys.L, Keys.J];
    this.prevKeys = [Keys.PgUp, Keys.Left, Keys.H, Keys.K];
    this.controlsKeys = [Keys.cmd, Keys.ctrl, Keys.alt, Keys.shift];
    this.selectKeys = [Keys.enter, Keys.space];
    this.exitFullscreenKeys = [Keys.esc];
    this.enterFullscreenKeys = [Keys.F];

    // Set Key listeners
    document.addEventListener('touchstart', this.handleTouchStart, false);
    document.addEventListener('touchmove', this.handleTouchMove, false);
    document.addEventListener('keydown', this.keyDownController);
    document.addEventListener('keyup', this.keyUpController);
    document.addEventListener('dblclick', this.dblClickController);

    // Calculate scale and update it on window resize
    const resizeObserver = new ResizeObserver(this.calculateScale);
    resizeObserver.observe(window.document.body);

    // Initialize broadcast
    SlideController.messenger.setBroadcast(StateURL.broadcast);

    // Set messager listeners
    SlideController.messenger.register('slidecontroller:select', this.markSlide);
    SlideController.messenger.register('slidecontroller:change', this.scrollToCurrent);
    SlideController.messenger.register('slidecontroller:fullscreenchange', this.fullScreenChange);

    // Check page structure
    this.container = document.querySelector(Selectors.container);
    if (this.container === null) throw new Error("Container not found");
    this.slides = this.container.querySelectorAll(Selectors.slide);
    if (this.slides === null) throw new Error("No slides found");

    // Transform NodeList to Array
    this.slides = [...this.slides];
    this.totalSlides = this.slides.length;

    // SlideController.messenger.post("slidecontroller:total", {
    //   detail: {
    //     slideTotal: this.totalSlides,
    //   },
    // });

    // Give slides a number and tabindex
    this.slides.forEach((slide, index) => {
      slide.dataset.number = index;
      slide.style.setProperty('--slide-number', index);
    });

    // Get current slide from hash
    this.slideFromString();

    console.log('slide', this.currentSlide);

    // select current slide
    SlideController.messenger.post("slidecontroller:select", {
      detail: {
        slideNumber: this.currentSlide,
      },
      bubbles: true,
    });

    // console.log(StateURL.fullscreen);
    
    // Get fullscreen state from search query
    if (StateURL.fullscreen) {
      SlideController.messenger.post("slidecontroller:fullscreenchange", {
        detail: {
          force: StateURL.fullscreen
        }
      });
    }
  }

  // Handle touch start
  handleTouchStart (event) {
    if (!StateURL.fullscreen || !this.isTouchDevice) {
      return;
    }
    const firstTouch = event.touches[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  }

  // Handle touch move
  handleTouchMove (event) {
    if ( !StateURL.fullscreen || !this.isTouchDevice || !this.xDown || !this.yDown ) {
      return;
    }

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;

    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    if ( Math.abs(xDiff) < Options.swipeThreshold && Math.abs(yDiff) < Options.swipeThreshold) {
      return;
    }

    // let sliderEvent;
    if ( Math.abs(xDiff) > Math.abs(yDiff) ) {
      /*most significant*/
      if ( xDiff > 0 ) {
        /* left swipe */
        // SlideController.messenger.post("slidecontroller:select", {
        //   detail: {
        //     slideNumber: this.cicleSlideNumber(this.currentSlide + 1),
        //   },
        //   bubbles: true,
        // });
      } else {
        /* right swipe */
        // SlideController.messenger.post("slidecontroller:select", {
        //   detail: {
        //     slideNumber: this.cicleSlideNumber(this.currentSlide - 1),
        //   },
        //   bubbles: true,
        // });
      }
    } else {
      if ( yDiff > 0 ) {
        /* up swipe */
        // SlideController.messenger.post("slidecontroller:select", {
        //   detail: {
        //     slideNumber: this.cicleSlideNumber(this.currentSlide + 1),
        //   },
        //   bubbles: true,
        // });
      } else {
        /* down swipe */
        // SlideController.messenger.post("slidecontroller:select", {
        //   detail: {
        //     slideNumber: this.cicleSlideNumber(this.currentSlide - 1),
        //   },
        //   bubbles: true,
        // });
      }
    }

    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }

  // handle doubleclick
  dblClickController (event) {
    const element = event.target;
    if (element.matches(Selectors.slide)) {
      SlideController.messenger.post("slidecontroller:select", {
        detail: {
          slideNumber: parseInt(element.dataset.number),
        },
        bubbles: true,
      });
      // SlideController.messenger.post("slidecontroller:fullscreenchange", {
      //   detail: {
      //     force: !StateURL.fullscreen,
      //   },
      // });
    }
  }

  // toggle fullscreen mode
  fullScreenChange (event) {
    const force = event?.detail?.force;
    console.log('fullscreen force:', force);

    window.document.documentElement.classList.toggle(ClassNames.fullscreen, force);
    StateURL.fullscreen = force;

    if (!this.supportHostContext) {
      this.slides.forEach(slide => {
        slide.classList.toggle(ClassNames.fullscreen, force);
      });
    }
    
    // no need to scroll in fullscreen
    if (force === true) return;

    console.log('change');

    // scroll to slide in the list mode
    SlideController.messenger.post("slidecontroller:change", {
      detail: {
        animated: false,
      },
    });
  }

  // Get slide number from hash and set it as instanse state
  slideFromString () {
    const { slide } = StateURL;
    this.currentSlide = this.safeSlideNumber(parseInt(slide));
  }
  
  // scroll to slide
  scrollToCurrent (event) {
    const animated = !!event?.detail?.animated;
    // We can't scroll in the fullscreen mode
    if (StateURL.fullscreen) return;
    // We should do it on next cicle, when redraw happen and we can check if slide in the viewport
    setTimeout(() => {
      if (!isElementVisible(this.slides[this.currentSlide], 90)) {
        const endPos = this.slides[this.currentSlide].offsetTop - 20;
        window.scroll({
          top: endPos,
          left: 0,
          behavior: animated ? 'smooth' : 'auto',
        });
      }
    }, 50);

  }

  // make sure slide number inside the existing range
  safeSlideNumber(index) {
    if (Number.isNaN(index) || (index < 0)) return 0;
    if (index >= this.totalSlides) return (this.totalSlides - 1);
    return index;
  }

  // circle slides
  cicleSlideNumber(index) {
    if (index < 0) return this.totalSlides - 1;
    if (index >= this.totalSlides) return 0;
    return index;
  }

  // get prev slide element
  getPrevSlide (slideNumber) {
    return this.slides[slideNumber - 1] === undefined
      ? this.slides[this.totalSlides - 1]
      : this.slides[slideNumber - 1];
  }

  // get next slide element
  getNextSlide (slideNumber) {
    return this.slides[slideNumber + 1] === undefined
      ? this.slides[0]
      : this.slides[slideNumber + 1];
  }

  // mark element as current slide
  markSlide (event) {
    const slideNumber = this.safeSlideNumber(event?.detail?.slideNumber);
    

    if (
      slideNumber === this.currentSlide && 
      this.slides[this.currentSlide].classList.contains(ClassNames.currentSlide)
    ) {
      return;
      // SlideController.messenger.post("slidecontroller:fullscreenchange", {
      //   detail: {
      //     force: !StateURL.fullscreen
      //   }
      // });
    }

    // remove old classes
    this.getPrevSlide(this.currentSlide).classList.toggle(ClassNames.prevSlide, false);
    this.getNextSlide(this.currentSlide).classList.toggle(ClassNames.nextSlide, false);
    this.slides[this.currentSlide].classList.toggle(ClassNames.currentSlide, false);

    // add new classes
    this.getPrevSlide(slideNumber).classList.toggle(ClassNames.prevSlide, true);
    this.getNextSlide(slideNumber).classList.toggle(ClassNames.nextSlide, true);
    this.slides[slideNumber].classList.toggle(ClassNames.currentSlide, true);

    // update instance state
    this.currentSlide = slideNumber;

    // update URL
    StateURL.slide = slideNumber;

    // update progress
    SlideController.messenger.post("slidecontroller:change", {
      detail: {
        animated: false,
        slideNumber,
      },
    });
  }

  keyUpController (event) {
    const index = this.controlsPressed.indexOf(event.which);
    if (index > -1) {
      this.controlsPressed.splice(index, 1);
    }
  }

  keyDownController (event) {
    // Control keys
    if (this.controlsKeys.includes(event.which) && !this.controlsPressed.includes(event.which)) {
      this.controlsPressed.push(event.which);
      return;
    }

    // Select next slide
    if (this.nextKeys.includes(event.which)) {
      SlideController.messenger.post("slidecontroller:select", {
        detail: {
          slideNumber: this.cicleSlideNumber(this.currentSlide + 1),
        },
        bubbles: true,
      });
    }

    // Select previous slide
    if (this.prevKeys.includes(event.which)) {
      SlideController.messenger.post("slidecontroller:select", {
        detail: {
          slideNumber: this.cicleSlideNumber(this.currentSlide - 1),
        },
        bubbles: true,
      });
    }

    // Esc to exit fullscreen
    if (
      this.exitFullscreenKeys.includes(event.which)
      && StateURL.fullscreen
    ) {
      // if no page selector visible, but we are in fullscreen mode
      SlideController.messenger.post("slidecontroller:fullscreenchange", {
        detail: {
          force: false,
        },
      });
    }

    // Enter to switch fullscreen
    if (this.enterFullscreenKeys.includes(event.which)) {
      if (event.target.classList.contains(ClassNames.currentSlide) || event.target.tagName === 'BODY') {
        SlideController.messenger.post("slidecontroller:fullscreenchange", {
          detail: {
            force: !StateURL.fullscreen
          }
        });
      }
    }
  }

  calculateScale () {
    // scale for slide list
    const stylesList = getComputedStyle(document.documentElement);
    const slideWidth = stylesList.getPropertyValue('--slide-width');
    const columnWidth = stylesList.getPropertyValue('--column-width');
    const slideRatio = stylesList.getPropertyValue('--slide-ratio');
    const div = document.createElement('div');
    div.style.width = columnWidth;
    div.style.aspectRatio = slideRatio;
    document.body.appendChild(div);
    const columnWidthCalculated = div.offsetWidth;
    const columnHeightCalculated = div.offsetHeight;
    const ratio = columnWidthCalculated / columnHeightCalculated;
    div.remove();

    const listScale = (columnWidthCalculated/parseInt(slideWidth,10)).toPrecision(3);
    document.documentElement.style.setProperty('--list-scale', listScale);

    // Scale for full screen
    const slideHeight = parseInt(slideWidth) / ratio;
    const scale = 1/Math.max(
      parseFloat(slideWidth, 10)/window.innerWidth,
      slideHeight/window.innerHeight
    );
    document.documentElement.style.setProperty('--slide-scale', scale);
  }
}

const initApplication = () => {
  new SlideController();
  document.removeEventListener('onreadystatechange', initApplication);
}

if (document.readyState === 'loading') {
  document.addEventListener('onreadystatechange', initApplication);
} else {
  new SlideController();
}