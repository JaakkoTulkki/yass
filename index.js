// let s = [
//   '\n    | name  | value |\n    | hello | ',
//   ' |\n    | c | 9 |\n    | wow | ',
//   ' |\n    | ',
//   ' | ',
//   ' |\n  '
// ];
//
// let r = /^( +)?\n( +)?\|/;
// let rr = /^( +)?\n( +)?/;
// console.log(s);
// s[0] = s[0].replace(rr, '');
// console.log(s);

let rr = /^( +)?\n( +)?/;



function hello() {

}

const stateManager = setInitialState`
    | name  | ${'value'} | wow |
    | hello | ${4} | ehta |
    | c | 9 | oikea |
    | ${3} | ${hello} | kana |
  `;

function setInitialState(strings, ...js) {
  // constructs the state
  // console.log(strings);
  // console.log(js);
  const s = getRows(strings, ...js);
  // console.log('*****');
  // console.log(s);
}


function getRows(strs, ...js) {
  let strings = [...strs];
  let s = strs[0].replace(rr, '');
  strings[0] = s;
  const a = strings.join('').split('\n').map(e => e.trim());
  let rows = a;
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
  console.log(rows);



  // console.log(js);
  // const columnLength = getColumns(strs).length;
  // const s = strs.map(e => {
  //   return e.split('\n')
  // }).reduce((acc, e) => {
  //   return acc.concat(e);
  // }, [])
  //   .filter(e => e);
  // console.log(strs.slice(1));
  //   .slice(1)
  //   .map(e => e.trim())
  //   .map(e => {
  //     return e.split('|')
  //       .map(e => e.trim())
  //       .filter(e => e)
  //   })
  //   .filter(e => e.length > 0);
  // let c = 0;
  // s.map(row => {
  //   if (row.length < columnLength) {
  //     row.push(js[c++]);
  //   }
  //   return row;
  // });


  // return s;
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

  if (notAllowed.length > 0) {
    throw new Error(`Unknown columns: ${notAllowed.join(', ')}`)
  }

  return strs;
}