class BoundaryRegistry {
  constructor() {
    this.boundaries = new Map();
  }

  register(boundary) {
    this.boundaries.set(boundary.id, boundary);
  }

  get(id) {
    return this.boundaries.get(id);
  }
}

module.exports = { BoundaryRegistry };
