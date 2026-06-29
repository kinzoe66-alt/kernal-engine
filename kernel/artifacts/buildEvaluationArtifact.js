const { EvaluationArtifact } = require("./evaluationArtifact");

function buildEvaluationArtifact(boundary, result) {
  return new EvaluationArtifact({
    boundary: boundary.id,
    result
  });
}

module.exports = { buildEvaluationArtifact };
