const { evaluate } = require("./kernel");
const { loadObservedReality } = require("./loaders/json/loadObservedReality");
const { loadExpectedReality } = require("./loaders/yaml/loadExpectedReality");

const observed = loadObservedReality("examples/banking.observed.json");
const expected = loadExpectedReality("examples/banking.contract.yaml");

console.log(
  JSON.stringify(evaluate(observed, expected), null, 2)
);
