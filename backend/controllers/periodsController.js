const db = require('../db');

exports.getPeriods = (req, res) => {
  db.query('SELECT * FROM periods', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.addPeriod = (req, res) => {
  const { period, active } = req.body;
  db.query(
    'INSERT INTO periods (period, active) VALUES (?,?)',
    [period, active],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Period added successfully' });
    }
  );
};

exports.updatePeriod = (req, res) => {
  const { id } = req.params;
  const { period } = req.body;
  db.query(
    'UPDATE periods SET period = ?, active = ? WHERE id = ?',
    [period, active, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Period updated successfully' });
    }
  );
};

exports.deletePeriod = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM periods WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Period deleted successfully' });
  });
};
