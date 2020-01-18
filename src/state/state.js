const {Value} = require('../value/value');

class State {
  constructor() {
    this.__state = {};
    this.__subscribers = [];
  }

  initialize(key, value) {
    this.__state[key] = new Value(key, value, this);
  }

  getState() {
    return this.__state;
  }

  update(key, newValue) {
    const obj = {};
    obj[key] = new Value(key, newValue, this);
    const s = {...this.__state, ...obj};
    this.__state = s;
    this.__subscribers.forEach(subscriber => {
      subscriber(this.getState());
    })
  }

  subscribe(s) {
    if(this.__subscribers.indexOf(s) === -1) {
      this.__subscribers.push(s);
    }
  }

  __setSetter(key, setterFunction) {
    this.__state[key].__setSetter(setterFunction);
  }
}

module.exports = {
  State,
};
