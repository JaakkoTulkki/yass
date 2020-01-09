const allowedColumns = ['name', 'value'];

function getColumns(strs, ...js) {

  const notAllowed = strs[0].filter(header => {
    return !allowedColumns.includes(header);
  });

  if(notAllowed.length > 0) {
    throw new Error(`Unknown columns: ${notAllowed.join(', ')}`)
  }

  return strs[0];
}

let startRegex = /^( +)?\n( +)?/;

function getAllRows(strs, ...js){
  let strings = [...strs];
  strings[0] = strs[0].replace(startRegex, '');
  let rows = strings.join('').split('\n').map(e => e.trim());
  let c = 0;
  rows = rows.map(row => {
    let r = row.split('|').slice(1, -1).map(e => e.trim());
    return r.map(e => {
      if(!e) {
        return js[c++];
      }
      return e;
    });
  }).filter(e => e.length);
  return rows;
}


function createState(strings, ...js) {
  const state = {};
  if (strings) {
    const allRows = getAllRows(strings, ...js);
    const headers = getColumns(allRows);
    const nameIndex = headers.indexOf('name');
    const valueIndex = headers.indexOf('value');

    allRows.slice(1).forEach(row => {
      const key = row[nameIndex];
      const t = typeof key;
      if(t === 'function' || t === 'object') {
        throw new Error('"name" property should not be a function or object');
      }
      state[key] = row[valueIndex];
    });
  }
  return state;
}

module.exports = {
  getColumns,
  getAllRows,
  createState,
};
