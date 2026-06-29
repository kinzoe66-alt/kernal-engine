const { EvaluationResult } = require("./model/evaluationResult");

function evaluate(observedReality, evaluationContract) {
  const observed = observedReality.data;
  const expected = evaluationContract.expectedReality.data;

  const requires = expected.requires || {};
  const missing = [];
  const failed = [];

  for (const [key, value] of Object.entries(requires)) {
    if (!(key in observed)) {
      missing.push(key);
      continue;
    }

    if (observed[key] !== value) {
      failed.push({
        key,
        expected: value,
        observed: observed[key]
      });
    }
  }

  return new EvaluationResult({
    satisfied: missing.length === 0 && failed.length === 0,
    missing,
    failed
  });
}

module.exports = { evaluate };
