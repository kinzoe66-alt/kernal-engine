const { Runtime } = require("../runtime/runtime");
const { Application } = require("../application/application");
const { Cartridge } = require("../kernel/cartridge/cartridge");
const { Boundary } = require("../kernel/boundary/boundary");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

const runtime = new Runtime();

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

const application = new Application({
  id: "banking-app",
  version: "1.0.0",
  cartridge
});

const result = runtime.execute(
  application,
  observed
);

if (
  result.artifacts.length !== 1 &&
  result.session.getRecords().length !== 1
) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
