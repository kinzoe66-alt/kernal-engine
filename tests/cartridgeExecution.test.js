const { DeterministicEngine } = require("../kernel/engine/deterministicEngine");
const { EvaluationSession } = require("../kernel/session/evaluationSession");
const { Cartridge } = require("../kernel/cartridge/cartridge");
const { Boundary } = require("../kernel/boundary/boundary");
const { executeCartridge } = require("../kernel/cartridge/executeCartridge");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

const engine = new DeterministicEngine();
const session = new EvaluationSession("session-001");

const observed = loadObservedReality(
  "examples/banking.observed.json"
);

const contract = loadEvaluationContract(
  "examples/banking.contract.yaml"
);

const cartridge = new Cartridge({
  id: "banking",
  version: "1.0.0",
  boundaries: [
    new Boundary({
      id: "login",
      contract
    })
  ]
});

const artifacts = executeCartridge(
  engine,
  cartridge,
  observed,
  session
);

if (
  artifacts.length !== 1 ||
  session.getRecords().length !== 1
) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
