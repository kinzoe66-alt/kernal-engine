const { evaluate } = require("../kernel");
const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadExpectedReality } = require("../loaders/yaml/loadExpectedReality");

const observed = loadObservedReality("examples/banking.observed.json");
const expected = loadExpectedReality("examples/banking.contract.yaml");

const result = evaluate(observed, expected);

if (!result.satisfied) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
