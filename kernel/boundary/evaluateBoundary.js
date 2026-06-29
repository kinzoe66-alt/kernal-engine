const { evaluate } = require("../evaluator");

function evaluateBoundary(boundary, observedReality) {
  return evaluate(
    observedReality,
    boundary.contract
  );
}

module.exports = { evaluateBoundary };
