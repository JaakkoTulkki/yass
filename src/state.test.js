const {createState} = require("./template");

describe('state', function () {
  let yass;

  beforeEach(() => {
    yass = createState`
    | name   | value |
    | hello  | world |
    | num    | ${42} |
    | ${'n'} | 9     |
    `;
  });

  describe('getState()', function () {
    it('should return the state', function () {
      expect(yass.getState()).toBeDefined();
    });
  });

  describe('key.value', function () {
    it('should return the value', function () {
      const s = yass.getState();
      expect(s.hello.value).toEqual('world');
      expect(s.num.value).toEqual(42);
      expect(s.n.value).toEqual('9');
    });
  });

  describe('key.set()', function () {
    it('should set the value on the new object', function () {
      const state = yass.getState();
      expect(state.hello.value).toEqual('world');

      state.hello.set('new value');
      // the original objects value should not have changed
      expect(state.hello.value).toEqual('world');

      expect(yass.getState().hello.value).toEqual('new value');
    });

    it('should call the provided function in the type function', function () {
      let previousState;
      let receivedState;
      function setterFunction(newValue, previousValue, getState) {
        receivedState = getState();
        return newValue + previousValue;
      }
      yass = createState`
    | name   | value | type              |
    | hello  | world |                   |
    | num    | ${42} |                   |
    | ${'n'} | ${9}  | ${setterFunction} |
    `;

      previousState = yass.getState();
      expect(yass.getState().n.value).toEqual(9);
      yass.getState().n.set(1);
      expect(yass.getState().n.value).toEqual(10);
      expect(receivedState).toBeDefined();
      expect(receivedState).toEqual(previousState);
    });
  });

  it('subscribers should be called on state update', function () {
    const state = yass.getState();

    const mock1 = jest.fn();
    let s1;
    const sub1 = function (s) {
      mock1();
      s1 = s;
    };

    const mock2 = jest.fn();
    let s2;
    const sub2 = function (s) {
      mock2();
      s2 = s;
    };
    yass.subscribe(sub1);
    yass.subscribe(sub2);

    state.hello.set(1);

    expect(yass.getState().hello.value).toEqual(1);

    expect(mock1).toHaveBeenCalled();
    expect(s1).toBe(yass.getState());

    expect(mock2).toHaveBeenCalled();
    expect(s2).toBe(yass.getState());

  });
});