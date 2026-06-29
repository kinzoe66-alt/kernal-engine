class System {
  constructor({
    id,
    version,
    environments = []
  }) {
    this.id = id;
    this.version = version;
    this.environments = environments;

    Object.freeze(this);
  }
}

module.exports = { System };
