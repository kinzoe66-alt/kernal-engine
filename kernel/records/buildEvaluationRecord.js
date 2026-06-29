const { EvaluationRecord } = require("./evaluationRecord");

function buildEvaluationRecord({
  artifact,
  observedReality,
  contract
}) {
  return new EvaluationRecord({
    artifact,
    observedReality,
    contract
  });
}

module.exports = { buildEvaluationRecord };
