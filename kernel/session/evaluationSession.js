class EvaluationSession {
  constructor(id) {
    this.id = id;
    this.records = [];
  }

  record(record) {
    this.records.push(record);
  }

  getRecords() {
    return [...this.records];
  }
}

module.exports = { EvaluationSession };
