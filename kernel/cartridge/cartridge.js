class Cartridge {
  constructor({
    id,
    version,
    boundaries = []
  }) {
    this.id = id;
    this.version = version;
    this.boundaries = boundaries;

    Object.freeze(this);
  }
}

module.exports = { Cartridge };
