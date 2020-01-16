function stateIntoValueObj(state) {
  return Object.entries(state).reduce((acc, [key, value]) =>{
    acc[key] = value.value;
    return acc;
  }, {});
}

module.exports = {
  stateIntoValueObj,
};
