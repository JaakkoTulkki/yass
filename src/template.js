const {State} = require('./state/state');

function getColumns(strs) {

  const notAllowed = strs[0].filter(header => {
    return !['name', 'value', 'type'].includes(header);
  });

  if (notAllowed.length > 0) {
    throw new Error(`Unknown columns: ${notAllowed.join(', ')}`)
  }

  return strs[0];
}

let startRegex = /^( +)?\n( +)?/;

function getAllRows(strs, ...js) {
  let strings = [...strs];
  strings[0] = strs[0].replace(startRegex, '');

  let mappedStringsAndJs = strings
    .reduce((acc, s, i) => {
      if (i < js.length) {
        return acc.concat([s, js[i]]);
      }
      return acc.concat(s);
    }, [])
    .reduce((acc, s) => {
      if (typeof s === 'string') {
        return acc.concat(s.split('\n'));
      }
      return acc.concat(s);
    }, [])
    .map(e => typeof e === "string" ? e.trim() : e)
    .filter(e => e);

  const tableColumnLength = strings.join('').split('\n')[0].split('|').slice(1, -1).length;

  let collector = [];
  let cache = [];

  for (let i = 0; i < mappedStringsAndJs.length; i++) {
    let item = mappedStringsAndJs[i];

    if (typeof item === "string") {
      let split = item.trim().split('|').filter(e => e);
      let nColumns = split.length;
      if (nColumns === tableColumnLength) {
        collector.push(split);
      } else {
        cache = cache.concat(split);
        if (cache.length === tableColumnLength) {
          collector.push(cache);
          cache = [];
        }
      }
    } else {
      cache = cache.concat(item);
    }
  }

  return collector.map(row => {
    return row.map(item => {
      if (typeof item === 'string') {
        let s = item.trim();
        return s ? s : undefined;
      }
      return item;
    })
  });
}

function createState(strings, ...js) {
  const state = new State();
  if (strings) {
    const allRows = getAllRows(strings, ...js);
    const headers = getColumns(allRows);
    const nameIndex = headers.indexOf('name');
    const valueIndex = headers.indexOf('value');

    allRows.slice(1).forEach(row => {
      const key = row[nameIndex];
      const t = typeof key;
      if (t === 'function' || t === 'object') {
        throw new Error('"name" property should not be a function or object');
      }
      state.initialize(key, row[valueIndex]);
    });
  }
  return state;
}

module.exports = {
  getColumns,
  getAllRows,
  createState,
};
