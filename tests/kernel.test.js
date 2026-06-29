const { evaluate } = require("../kernel");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

const observed = loadObservedReality(
  "examples/banking.observed.json"
);

const contract = loadEvaluationContract(
  "examples/banking.contract.yaml"
);

const result = evaluate(
  observed,
  contract
);

if (!result.satisfied) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
