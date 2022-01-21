import Options from "./Options.mjs";

class MessageController {
  constructor (isBroadcastEnabled = true) {
    // Binding this to all class methods
    for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      const method = this[name];
      if (name !== 'constructor' && typeof method === 'function') {
        this[name] = method.bind(this);
      }
    }
    this.isBroadcastEnabled = isBroadcastEnabled;
    this.isBroadcastAble = typeof BroadcastChannel !== "undefined";

    if(this.isBroadcastAble) {
      this.channel = new BroadcastChannel(Options.channelName);
      this.channel.onmessage = this.messageHandler;
      this.channel.onmessageerror = (error) => {
        console.log(error);
      }
    }
    this.handlers = {};
  }

  destructor () {
    this.channel.close();
  }

  toggleBroadcast() {
    this.isBroadcastEnabled = !this.isBroadcastEnabled;
  }

  setBroadcast(value) {
    this.isBroadcastEnabled = value;
  }

  register (name, callback) {
    document.addEventListener(name, callback);
    if (this.handlers[name] === undefined) {
      this.handlers[name] = [];
    }
    this.handlers[name].push(callback);
  }

  unregister (name, callback) {
    document.removeEventListener(name, callback);
    const index = this.handlers[name].findIndex(handler => callback === handler);
    if (index > -1) this.handlers[name].splice(index, 1);
  }

  post(name, options) {
    const { broadcast = true } = options;
    delete options.broadcast;

    const event = new CustomEvent(name, options);
    window.document.dispatchEvent(event);

    if (!this.isBroadcastAble || !this.isBroadcastEnabled || !broadcast) return;

    this.channel.postMessage({
      name,
      detail: options?.detail,
    });
  }

  messageHandler(messageEvent) {
    const { data: { name, detail } } = messageEvent;
    // console.log('get message', detail, messageEvent)
    if (this.handlers[name] === undefined) return;
    this.handlers[name].forEach(handler => {
      handler({detail});
    });
  }
}

window[Symbol.for("SlideMessanger")] = new MessageController();

export default MessageController;