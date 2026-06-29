class Environment {
  constructor({
    id,
    version,
    applications = []
  }) {
    this.id = id;
    this.version = version;
    this.applications = applications;

    Object.freeze(this);
  }
}

module.exports = { Environment };
