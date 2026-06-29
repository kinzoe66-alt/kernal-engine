const { evaluate } = require("./kernel");

const { loadObservedReality } = require("./loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("./loaders/yaml/loadEvaluationContract");

const observed = loadObservedReality(
  "examples/banking.observed.json"
);

const contract = loadEvaluationContract(
  "examples/banking.contract.yaml"
);

const result = evaluate(
  observed,
  contract
);

console.log(
  JSON.stringify(result, null, 2)
);
