const { Runtime } = require("../runtime/runtime");
const { System } = require("../system/system");
const { Environment } = require("../environment/environment");
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

const boundary = new Boundary({
  id: "login",
  contract
});

const cartridge = new Cartridge({
  id: "banking",
  version: "1.0.0",
  boundaries: [boundary]
});

const application = new Application({
  id: "banking-app",
  version: "1.0.0",
  cartridge
});

const environment = new Environment({
  id: "bank",
  version: "1.0.0",
  applications: [application]
});

const system = new System({
  id: "enterprise",
  version: "1.0.0",
  environments: [environment]
});

const result = runtime.execute(
  system,
  "bank",
  "banking-app",
  observed
);

if (
  result.artifacts.length !== 1 ||
  result.session.getRecords().length !== 1
) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
