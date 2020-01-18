class Value {
  constructor(key, value, State) {
    this.__value = value;
    this.__key = key;
    this.__State = State;
    this.__setter = undefined;
  }

  get value() {
    return this.__value;
  }

  set(newValue) {
    if(this.__setter) {
      newValue = this.__setter(newValue, this.__value, this.__State.getState.bind(this.__State));
    }
    this.__State.update(this.__key, newValue);
  }

  __setSetter(f) {
    this.__setter = f;
  }
}

module.exports = {
  Value,
};
