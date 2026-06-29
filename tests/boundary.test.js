const { Boundary } = require("../kernel/boundary/boundary");
const { evaluateBoundary } = require("../kernel/boundary/evaluateBoundary");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

const observed = loadObservedReality(
  "examples/banking.observed.json"
);

const contract = loadEvaluationContract(
  "examples/banking.contract.yaml"
);

const boundary = new Boundary({
  id: "login",
  contract
});

const result = evaluateBoundary(
  boundary,
  observed
);

if (!result.satisfied) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
