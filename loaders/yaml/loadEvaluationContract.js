const fs = require("fs");
const YAML = require("yaml");

const { EvaluationPolicy } = require("../../kernel/policy/evaluationPolicy");
const { ExpectedReality } = require("../../kernel/model/expectedReality");
const { EvaluationContract } = require("../../kernel/contracts/evaluationContract");

function loadEvaluationContract(path) {
  const document = YAML.parse(
    fs.readFileSync(path, "utf8")
  );

  const policy = new EvaluationPolicy(
    document.policy || {}
  );

  const expectedReality = new ExpectedReality({
    requires: document.requires || {}
  });

  return new EvaluationContract({
    policy,
    expectedReality
  });
}

module.exports = { loadEvaluationContract };
