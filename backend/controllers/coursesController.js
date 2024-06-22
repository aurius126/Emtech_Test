const db = require('../db');

exports.getCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.addCourse = (req, res) => {
  const { course_name } = req.body;
  db.query(
    'INSERT INTO courses (course_name) VALUES (?)',
    [course_name],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Course added successfully' });
    }
  );
};

exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const { course_name } = req.body;
  db.query(
    'UPDATE courses SET course_name = ? WHERE id = ?',
    [course_name, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Course updated successfully' });
    }
  );
};

exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM courses WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Course deleted successfully' });
  });
};
