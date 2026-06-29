class EvaluationRecord {
  constructor({
    artifact,
    observedReality,
    contract
  }) {
    this.artifact = artifact;
    this.observedReality = observedReality;
    this.contract = contract;

    Object.freeze(this);
  }
}

module.exports = { EvaluationRecord };
