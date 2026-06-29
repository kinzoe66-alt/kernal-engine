class Application {
  constructor({
    id,
    version,
    cartridge
  }) {
    this.id = id;
    this.version = version;
    this.cartridge = cartridge;

    Object.freeze(this);
  }
}

module.exports = { Application };
