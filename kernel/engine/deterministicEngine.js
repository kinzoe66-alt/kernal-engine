const { evaluateBoundary } = require("../boundary/evaluateBoundary");
const { buildEvaluationArtifact } = require("../artifacts/buildEvaluationArtifact");
const { buildEvaluationRecord } = require("../records/buildEvaluationRecord");

class DeterministicEngine {
  evaluate(boundary, observedReality, session) {
    const result = evaluateBoundary(boundary, observedReality);

    const artifact = buildEvaluationArtifact(
      boundary,
      result
    );

    const record = buildEvaluationRecord({
      artifact,
      observedReality,
      contract: boundary.contract
    });

    session.record(record);

    return artifact;
  }
}

module.exports = { DeterministicEngine };
