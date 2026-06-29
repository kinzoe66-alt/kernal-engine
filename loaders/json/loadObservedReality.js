const fs = require("fs");
const { ObservedReality } = require("../../kernel/model/observedReality");

function loadObservedReality(path) {
  return new ObservedReality(
    JSON.parse(fs.readFileSync(path, "utf8"))
  );
}

module.exports = { loadObservedReality };
