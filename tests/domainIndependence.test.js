const { Runtime } = require("../runtime/runtime");
const { System } = require("../system/system");
const { Environment } = require("../environment/environment");
const { Application } = require("../application/application");
const { Cartridge } = require("../kernel/cartridge/cartridge");
const { Boundary } = require("../kernel/boundary/boundary");

const { loadObservedReality } = require("../loaders/json/loadObservedReality");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

const runtime = new Runtime();

function buildSystem(contractFile) {
  const contract = loadEvaluationContract(contractFile);

  return new System({
    id: "system",
    version: "1.0.0",
    environments: [
      new Environment({
        id: "default",
        version: "1.0.0",
        applications: [
          new Application({
            id: "app",
            version: "1.0.0",
            cartridge: new Cartridge({
              id: "domain",
              version: "1.0.0",
              boundaries: [
                new Boundary({
                  id: "primary",
                  contract
                })
              ]
            })
          })
        ]
      })
    ]
  });
}

const scenarios = [
  {
    contract: "examples/banking.contract.yaml",
    observed: "examples/banking.observed.json",
    expected: true
  },
  {
    contract: "examples/api/api.contract.yaml",
    observed: "examples/api/api-success.observed.json",
    expected: true
  },
  {
    contract: "examples/api/api.contract.yaml",
    observed: "examples/api/api-unauthorized.observed.json",
    expected: false
  },
  {
    contract: "examples/api/api.contract.yaml",
    observed: "examples/api/api-missing-resource.observed.json",
    expected: false
  }
];

for (const s of scenarios) {
  const system = buildSystem(s.contract);
  const observed = loadObservedReality(s.observed);

  const result = runtime.execute(
    system,
    "default",
    "app",
    observed
  );

  const actual = result.artifacts[0].result.satisfied;

  if (actual !== s.expected) {
    console.error("FAIL:", s.observed);
    process.exit(1);
  }

  console.log("PASS:", s.observed);
}

console.log("DOMAIN INDEPENDENCE VERIFIED");
