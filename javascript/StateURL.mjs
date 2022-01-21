import Options from "./Options.mjs";

class StateURL {
  static deleteFromSearch(name) {
    const url = new URL(window.location.href);
    url.searchParams.delete(name);
    const state = StateURL.buildState();
    history.pushState(state, document.title?.textContent, url.href);
  }

  static isInSearch(name) {
    return new URL(window.location.href).searchParams.has(name);
  }

  static getFromSearch(name) {
    return new URL(window.location.href).searchParams.get(name);
  }

  static setToSearch(name, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    const state = StateURL.buildState();
    history.pushState(state, document.title?.textContent, url.href);
  }

  static buildState() {
    const url = new URL(window.location.href);
    const status = {
      slide: StateURL.slide,
    };
    for (const [key, value] of url.searchParams) {
      status[key] = value;
    }
    return status;
  }

  static get slide() {
    const url = new URL(window.location.href);
    const { hash } = url;
    const slide = hash.replace(Options.slidePrefix, "").trim();
    return (hash.length > 0)
      ? parseInt(slide, 10)
      : 1;
  }

  static set slide(value) {
    const url = new URL(window.location.href);
    const state = StateURL.buildState();
    url.hash = `${Options.slidePrefix}${value}`;
    history.pushState(state, document.title?.textContent, url.href);
  }

  static get fullscreen() {
    return StateURL.isInSearch(Options.fullscreenQueryName);
  }

  static set fullscreen(value) {
    if (value) {
      StateURL.setToSearch(Options.fullscreenQueryName, true);
    } else {
      StateURL.deleteFromSearch(Options.fullscreenQueryName);
    }
  }

  static get caption() {
    return Options.captionModeEnum.indexOf(StateURL.getFromSearch(Options.captionQueryName));
  }

  static set caption(value) {
    if (value !== null) {
      StateURL.setToSearch(Options.captionQueryName, value);
    } else {
      StateURL.deleteFromSearch(Options.captionQueryName);
    }
  }

  static get broadcast() {
    const isBroadcastEnabled = StateURL.getFromSearch(Options.broadcastQueryName);
    if (isBroadcastEnabled === null) {
      StateURL.setToSearch(Options.broadcastQueryName, true);
      return true;
    }
    return isBroadcastEnabled;
  }

  static set broadcast(value) {
    StateURL.setToSearch(Options.broadcastQueryName, value);
  }
}

export default StateURL;
