class EvaluationContract {
  constructor({ policy, expectedReality }) {
    this.policy = policy;
    this.expectedReality = expectedReality;

    Object.freeze(this);
  }
}

module.exports = { EvaluationContract };
