const {getColumns, getRows, createState} = require('./template');

describe('getColumns', function () {
  it('should get columns from a string', function () {
    const columns = getColumns`
    | name  | value | 
    | hello | world |
    `;
    expect(columns).toEqual(['name', 'value']);
  });

  it('should throw an error if unknown columns', function () {
    const c = () => getColumns`
    | name  | value | some|hi|      this| 
    | hello | world |    there| ka|kd|
    `;
    expect(c).toThrow('Unknown columns: some, hi, this')
  });
});

describe('getRows', function () {
  it('should return row in ordered array', function () {
    const rows = getRows`
    | name  | value |
    | hello | world |
    | wow   | cool |
    | 4     | 3 |
    `;

    expect(rows).toEqual([
      ['hello', 'world'],
      ['wow', 'cool'],
      ['4', '3'],
    ])
  });
});

describe('createState', function () {
  it('should return an object if no args provided', function () {
    const state = createState();
    expect(state).toEqual({});
  });

  it('should return an object with headers set to values', function () {
    const state = createState`
    | name  | value |
    | hello | world |
    `;
    expect(state).toEqual({hello: 'world'});
  });

  it('should return multiple rows in an object', function () {
    const state = createState`
    | name  | value |
    | hello | world |
    | n     | 9     |
    `;
    expect(state).toEqual({
      hello: 'world',
      n: '9',
    })
  });

});