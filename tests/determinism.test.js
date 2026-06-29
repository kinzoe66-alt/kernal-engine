const { Runtime } = require("../runtime/runtime");
const { System } = require("../system/system");
const { Environment } = require("../environment/environment");
const { Application } = require("../application/application");
const { Cartridge } = require("../kernel/cartridge/cartridge");
const { Boundary } = require("../kernel/boundary/boundary");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

const runtime = new Runtime();

const contract = loadEvaluationContract(
  "examples/banking.contract.yaml"
);

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
          cartridge: new Cartridge({
            id: "banking",
            version: "1.0.0",
            boundaries: [
              new Boundary({
                id: "login",
                contract
              })
            ]
          })
        })
      ]
    })
  ]
});

const cases = [
  ["examples/tests/login-success.observed.json", true],
  ["examples/tests/login-password-fail.observed.json", false],
  ["examples/tests/login-missing-2fa.observed.json", false]
];

for (const [file, expected] of cases) {
  const observed = loadObservedReality(file);

  const result = runtime.execute(
    system,
    "bank",
    "banking-app",
    observed
  );

  const actual = result.artifacts[0].result.satisfied;

  if (actual !== expected) {
    console.error("FAIL:", file);
    process.exit(1);
  }

  console.log(file, "PASS");
}

console.log("DETERMINISM VERIFIED");
