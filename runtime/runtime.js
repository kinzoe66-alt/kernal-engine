const crypto = require("crypto");

const { DeterministicEngine } = require("../kernel/engine/deterministicEngine");
const { EvaluationSession } = require("../kernel/session/evaluationSession");
const { executeCartridge } = require("../kernel/cartridge/executeCartridge");

class Runtime {
  constructor() {
    this.engine = new DeterministicEngine();
  }

  execute(system, environmentId, applicationId, observedReality) {
    const environment = system.environments.find(
      e => e.id === environmentId
    );

    const application = environment.applications.find(
      a => a.id === applicationId
    );

    const session = new EvaluationSession(
      crypto.randomUUID()
    );

    const artifacts = executeCartridge(
      this.engine,
      application.cartridge,
      observedReality,
      session
    );

    return {
      session,
      artifacts
    };
  }
}

module.exports = { Runtime };
