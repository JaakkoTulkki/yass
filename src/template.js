const allowedColumns = ['name', 'value'];

function getColumns(strs, ...js) {
  strs = strs[0]
    .split('\n')
    .filter(e => e)[0]
    .split('|')
    .filter(e => e)
    .map(e => e.trim())
    .filter(e => e);

  const notAllowed = strs.filter(header => {
    return !allowedColumns.includes(header);
  });

  if(notAllowed.length > 0) {
    throw new Error(`Unknown columns: ${notAllowed.join(', ')}`)
  }

  return strs;
}

function getRows(strs, ...js) {
  const columnLength = getColumns(strs).length;
  let rows =  strs.map(e => {
    return e.split('\n')
  }).reduce((acc, e) => {
    return acc.concat(e);
  }, [])
    .filter(e => e)
    .slice(1)
    .map(e => e.trim())
    .map(e => {
      return e.split('|')
        .map(e => e.trim())
        .filter(e => e)
    })
    .filter(e => e.length > 0);

  let c = 0;
  rows = rows.map(row => {
    if(row.length < columnLength) {
      return [...row, js[c++]]
    }
    return [...row];
  });


  return rows;
}


function createState(strings, ...js) {
  const state = {};
  if (strings) {

    const headers = getColumns(strings);
    const nameIndex = headers.indexOf('name');
    const valueIndex = headers.indexOf('value');

    const rows = getRows(strings);
    rows.forEach(row => {
      const key = row[nameIndex];
      state[key] = row[valueIndex];
    });
  }
  return state;
}

module.exports = {
  getColumns,
  getRows,
  createState,
};
