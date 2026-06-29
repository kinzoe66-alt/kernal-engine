class EvaluationArtifact {
  constructor({
    boundary,
    result,
    timestamp = new Date().toISOString()
  }) {
    this.boundary = boundary;
    this.result = result;
    this.timestamp = timestamp;

    Object.freeze(this);
  }
}

module.exports = { EvaluationArtifact };
