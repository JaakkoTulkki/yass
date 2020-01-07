const stateManager = setInitialState`
  | stateName  | initialValue | actionType    |
  | loading    | ${false}  | TOGGLE        |
  | name       | ''           | FUNC          |
  | balance    | ${0}         | ${setBalance} |
  `;



function setBalance(value, currentValue, stateAccessor) {
  // the args passed would get values
  // value = 125, currentValue=0, stateAccessor=something like the stateManager on App()
  return value + currentValue;
}

function setInitialState(strings, ...js) {
  // constructs the state
  console.log(strings);
  console.log(js);
}
