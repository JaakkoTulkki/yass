const {getColumns, createState} = require('./template');
const {stateIntoValueObj} = require('./test.utils');

describe('getColumns', function () {
  it('should return first index of an array', function () {
    const columns = getColumns([['name','value'], ['hello', 'world']]);
    expect(columns).toEqual(['name', 'value']);
  });

  it('should throw an error if unknown columns', function () {
    const c = () => getColumns([['name', 'some', 'value', 'hi', 'this']]);
    expect(c).toThrow('Unknown columns: some, hi, this')
  });
});

describe('createState', function () {
  it('should return an object if no args provided', function () {
    const state = createState();
    expect(state.getState()).toEqual({});
  });

  it('should return an object with headers set to values', function () {
    const state = createState`
    | name  | value |
    | hello | world |
    `;
    expect(stateIntoValueObj(state.getState())).toEqual({hello: 'world'});
  });

  it('should return an object with type header', function () {
    const state = createState`
    | name  | value | type |
    | hello | world |      |
    | hi    | ${5}  |      |
    `;

    expect(stateIntoValueObj(state.getState())).toEqual({hello: 'world', hi: 5});
  });

  it('should return multiple rows in an object', function () {
    const value = 'value';
    function someFunction() {

    }
    const state = createState`
    | name  | ${value} |
    | hello | world |
    | ${'n'}     | 9     |
    | ${'n'}     | 9     |
    | ${'hi'}     | ${44}     |
    | ${42}     |    ${someFunction} |
    `;

    const s = stateIntoValueObj(state.getState());

    expect(s).toEqual({
      hello: 'world',
      n: '9',
      hi: 44,
      42: someFunction,
    })
  });

  it('should throw an error if the name is a function', function () {
    const s = () => createState`
    | name  | value |
    | ${() => {}} | world |
    `;
    expect(s).toThrow('"name" property should not be a function or object');
  });

  it('should throw an error if the name is an object', function () {
    const s = () => createState`
    | name  | value |
    | ${{}} | world |
    `;
    expect(s).toThrow('"name" property should not be a function or object');
  });
});