const stateManager = setInitialState`
    | name  | value |
    | hello | ${4} |
    | c | 9 |
    | wow | ${5} |
  `;

function setInitialState(strings, ...js) {
  // constructs the state
  // console.log(strings);
  // console.log(js);
  const s = getRows(strings, ...js);
  console.log('*****');
  console.log(s);
}

function getRows(strs, ...js) {
  const columnLength = getColumns(strs).length;
  console.log(columnLength);
  console.log(js);
  const s =  strs.map(e => {
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
  s.map(row => {
    if(row.length < columnLength) {
      row.push(js[c++]);
    }
    return row;
  });


  return s;
}


function getColumns(strs, ...js) {
  const allowedColumns = ['name', 'value'];
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