const db = require('../db');

exports.getStudents = (req, res) => {
  db.query(`
    SELECT s.*, c.course_name, p.period AS period_name
    FROM students s 
    INNER JOIN courses c ON s.course = c.id 
    INNER JOIN periods p ON s.period = p.id`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.addStudent = (req, res) => {
  const { first_name, second_name, surname, lastname, email, phone, course, period, active, percent } = req.body;
  db.query(
    'INSERT INTO students (first_name, second_name, surname, lastname, email, phone, course, period, active, percent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [first_name, second_name, surname, lastname, email, phone, course, period, active, percent],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Student added successfully' });
    }
  );
};

exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { first_name, second_name, surname, lastname, email, phone, course, period, percent } = req.body;
  db.query(
    'UPDATE students SET first_name = ?, second_name = ?, surname = ?, lastname = ?, email = ?, phone = ?, course = ?, period = ?, percent = ? WHERE id = ?',
    [first_name, second_name, surname, lastname, email, phone, course, period, percent, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Student updated successfully' });
    }
  );
};

exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Student deleted successfully' });
  });
};
