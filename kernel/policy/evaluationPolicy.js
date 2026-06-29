class EvaluationPolicy {
  constructor(data) {
    this.data = Object.freeze(data);
    Object.freeze(this);
  }
}

module.exports = { EvaluationPolicy };
