class Value {
  constructor(key, value, State) {
    this.__value = value;
    this.__key = key;
    this.__State = State;
  }

  get value() {
    return this.__value;
  }

  set(newValue) {
    this.__State.update(this.__key, newValue);
  }
}

module.exports = {
  Value,
};
