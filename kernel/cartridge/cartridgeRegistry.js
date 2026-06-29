class CartridgeRegistry {
  constructor() {
    this.cartridges = new Map();
  }

  register(cartridge) {
    this.cartridges.set(cartridge.id, cartridge);
  }

  get(id) {
    return this.cartridges.get(id);
  }
}

module.exports = { CartridgeRegistry };
