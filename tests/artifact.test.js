const { Boundary } = require("../kernel/boundary/boundary");
const { evaluateBoundary } = require("../kernel/boundary/evaluateBoundary");
const { buildEvaluationArtifact } = require("../kernel/artifacts/buildEvaluationArtifact");

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

const artifact = buildEvaluationArtifact(
  boundary,
  result
);

if (artifact.boundary !== "login") {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
