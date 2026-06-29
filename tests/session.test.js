const { EvaluationSession } = require("../kernel/session/evaluationSession");
const { Boundary } = require("../kernel/boundary/boundary");
const { evaluateBoundary } = require("../kernel/boundary/evaluateBoundary");
const { buildEvaluationArtifact } = require("../kernel/artifacts/buildEvaluationArtifact");
const { buildEvaluationRecord } = require("../kernel/records/buildEvaluationRecord");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

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

const result = evaluateBoundary(boundary, observedReality);

const artifact = buildEvaluationArtifact(boundary, result);

const record = buildEvaluationRecord({
  artifact,
  observedReality,
  contract
});

session.record(record);

if (session.getRecords().length !== 1) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
