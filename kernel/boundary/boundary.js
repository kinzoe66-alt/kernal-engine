class Boundary {
  constructor({
    id,
    contract,
    metadata = {}
  }) {
    this.id = id;
    this.contract = contract;
    this.metadata = Object.freeze(metadata);

    Object.freeze(this);
  }
}

module.exports = { Boundary };
