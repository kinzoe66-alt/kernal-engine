const Architecture = require("../kernel/model/architecture");

const required = [
  "System",
  "Environment",
  "Application",
  "Cartridge",
  "Boundary",
  "EvaluationContract",
  "EvaluationPolicy",
  "ExpectedReality",
  "ObservedReality",
  "EvaluationResult"
];

for (const type of required) {
  if (!Architecture[type]) {
    console.error("FAIL:", type);
    process.exit(1);
  }
}

console.log("PASS");
