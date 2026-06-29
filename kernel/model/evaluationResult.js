class EvaluationResult {
  constructor({ satisfied, missing, failed }) {
    this.satisfied = satisfied;
    this.missing = missing;
    this.failed = failed;
    Object.freeze(this);
  }
}

module.exports = { EvaluationResult };
