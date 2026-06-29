const fs = require("fs");
const YAML = require("yaml");
const { ExpectedReality } = require("../../kernel/model/expectedReality");

function loadExpectedReality(path) {
  return new ExpectedReality(
    YAML.parse(fs.readFileSync(path, "utf8"))
  );
}

module.exports = { loadExpectedReality };
