function executeCartridge(
  engine,
  cartridge,
  observedReality,
  session
) {
  const artifacts = [];

  for (const boundary of cartridge.boundaries) {
    artifacts.push(
      engine.evaluate(
        boundary,
        observedReality,
        session
      )
    );
  }

  return artifacts;
}

module.exports = { executeCartridge };
