const {getAllRows} = require("./template");

describe('getAllRows', function () {
  it('should returns rows if properly formatted with line breaks', function () {
    function someFunction() {

    }
    const value = 'value';
    const rows = getAllRows`
    | name  | ${value} | wow |
    | hello | ${4} | ehta |
    | c | 9 | oikea |
    | ${3} | ${someFunction} | kana |
  `;

    expect(rows).toEqual([
      ['name', 'value', 'wow'],
      ['hello', 4, 'ehta'],
      ['c', '9', 'oikea'],
      [3, someFunction, 'kana'],
    ])
  });

  it('should return rows if properly formatted with ends without line breaks', function () {
    function someFunction() {

    }
    const value = 'value';
    const rows = getAllRows`| name  | ${value} | wow |
    | hello | ${4} | ehta |
    | c | 9 | oikea |
    | ${3} | ${someFunction} | kana |`;

    expect(rows).toEqual([
      ['name', 'value', 'wow'],
      ['hello', 4, 'ehta'],
      ['c', '9', 'oikea'],
      [3, someFunction, 'kana'],
    ])
  });
});