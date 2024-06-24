const db = require('../db');

exports.getStudents = (req, res) => {
  const { q, course, period, active, percent, page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;
  
  let filters = [];
  let values = [];

  if (q) {
    filters.push(`(s.first_name LIKE ? OR s.second_name LIKE ? OR s.surname LIKE ? OR s.lastname LIKE ? OR s.email LIKE ? OR s.phone LIKE ?)`);
    values.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
  }

  if (course) {
    filters.push("s.course = ?");
    values.push(course);
  }

  if (period) {
    filters.push("s.period = ?");
    values.push(period);
  }

  if (active) {
    filters.push("s.active = ?");
    values.push(active);
  }

  if (percent) {
    filters.push("s.percent = ?");
    values.push(percent);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

  db.query(`
    SELECT COUNT(*) as count
    FROM students s 
    INNER JOIN courses c ON s.course = c.id 
    INNER JOIN periods p ON s.period = p.id
    ${whereClause}`, values, (err, countResults) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const totalItems = countResults[0].count;
    const totalPages = Math.ceil(totalItems / limit);

    db.query(`
      SELECT s.*, c.course_name, p.period AS period_name
      FROM students s 
      INNER JOIN courses c ON s.course = c.id 
      INNER JOIN periods p ON s.period = p.id
      ${whereClause}
      LIMIT ? OFFSET ?`, [...values, limit, offset], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        data: results,
        totalItems,
        totalPages,
        currentPage: page
      });
    });
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
