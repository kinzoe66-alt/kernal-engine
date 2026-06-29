const { DeterministicEngine } = require("../kernel/engine/deterministicEngine");
const { EvaluationSession } = require("../kernel/session/evaluationSession");
const { Boundary } = require("../kernel/boundary/boundary");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

const engine = new DeterministicEngine();
const session = new EvaluationSession("session-001");

const observedReality = loadObservedReality(
  "examples/banking.observed.json"
);

const contract = loadEvaluationContract(
  "examples/banking.contract.yaml"
);

const boundary = new Boundary({
  id: "login",
  contract
});

const artifact = engine.evaluate(
  boundary,
  observedReality,
  session
);

if (
  !artifact.result.satisfied ||
  session.getRecords().length !== 1
) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
