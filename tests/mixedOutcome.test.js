const { Runtime } = require("../runtime/runtime");
const { System } = require("../system/system");
const { Environment } = require("../environment/environment");
const { Application } = require("../application/application");
const { Cartridge } = require("../kernel/cartridge/cartridge");
const { Boundary } = require("../kernel/boundary/boundary");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

const runtime = new Runtime();

const cartridge = new Cartridge({
  id: "banking",
  version: "1.0.0",
  boundaries: [
    new Boundary({
      id: "account",
      contract: loadEvaluationContract(
        "examples/multi-boundary/account.contract.yaml"
      )
    }),
    new Boundary({
      id: "transfer",
      contract: loadEvaluationContract(
        "examples/multi-boundary/transfer.contract.yaml"
      )
    })
  ]
});

const system = new System({
  id: "enterprise",
  version: "1.0.0",
  environments: [
    new Environment({
      id: "bank",
      version: "1.0.0",
      applications: [
        new Application({
          id: "banking-app",
          version: "1.0.0",
          cartridge
        })
      ]
    })
  ]
});

const observed = loadObservedReality(
  "examples/multi-boundary/observed-mixed.json"
);

const result = runtime.execute(
  system,
  "bank",
  "banking-app",
  observed
);

const outcomes = result.artifacts.map(a => a.result.satisfied);

if (
  outcomes.length !== 2 ||
  outcomes[0] !== true ||
  outcomes[1] !== false ||
  result.session.getRecords().length !== 2
) {
  console.error("FAIL");
  process.exit(1);
}

console.log("MIXED OUTCOME VERIFIED");
