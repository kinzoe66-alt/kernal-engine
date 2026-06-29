const { Cartridge } = require("../kernel/cartridge/cartridge");
const { Boundary } = require("../kernel/boundary/boundary");
const { loadEvaluationContract } = require("../loaders/yaml/loadEvaluationContract");

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

if (cartridge.boundaries.length !== 1) {
  console.error("FAIL");
  process.exit(1);
}

console.log("PASS");
