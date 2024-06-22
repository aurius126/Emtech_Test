const db = require("../db");

exports.getRecentStudents = (req, res) => {
  db.query(
    `SELECT s.*, c.course_name, p.period 
    FROM students s 
    INNER JOIN courses c ON s.course = c.id 
    INNER JOIN periods p ON s.period = p.id 
    ORDER BY s.id DESC 
    LIMIT 5`,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const processedResults = results.map((student) => ({
        ID: student.id,
        nombre: student.first_name + ' ' + student.second_name + ' ' + student.surname + ' ' + student.lastname,
        curso: student.course_name,
        estatus: student.active ? "Active" : "Inactive",
      }));

      res.json(processedResults);
    }
  );
};

exports.getActiveInactiveStudents = (req, res) => {
  db.query(
    "SELECT COUNT(*) AS active_students FROM students WHERE active = true",
    (err, activeResults) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      db.query(
        "SELECT COUNT(*) AS inactive_students FROM students WHERE active = false",
        (err, inactiveResults) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          const activeCount = activeResults[0].active_students;
          const inactiveCount = inactiveResults[0].inactive_students;

          res.json({
            active_students: activeCount,
            inactive_students: inactiveCount,
          });
        }
      );
    }
  );
};

exports.getStudentsCountByPeriod = (req, res) => {
  const query = `
    SELECT periods.period AS period, COUNT(students.id) AS student_count 
    FROM students 
    JOIN periods ON students.period = periods.id 
    GROUP BY periods.period;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const labels = [];
    const data = [];
    results.forEach(row => {
      labels.push(row.period);
      data.push(row.student_count);
    });
    const colors = ['rgb(79, 180, 219)', 'rgb(168, 82, 154)','rgb(81, 232, 194)','rgb(181, 153, 60)'];
    res.json({
      labels,
      data,
      colors
    });
  });
};

exports.getInactiveStudentsCountByPeriod = (req, res) => {
  const query = `
    SELECT periods.period AS period, COUNT(students.id) AS student_count 
    FROM students 
    JOIN periods ON students.period = periods.id 
    WHERE students.active = 0 
    GROUP BY periods.period;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const labels = [];
    const data = [];
    const colors = ['rgb(79, 180, 219)', 'rgb(168, 82, 154)','rgb(81, 232, 194)','rgb(181, 153, 60)'];

    results.forEach(row => {
      labels.push(row.period);
      data.push(row.student_count);
    });

    res.json({
      labels,
      data,
      colors
    });
  });
};


exports.getStudentsCountByCourse = (req, res) => {
  const query = `
    SELECT courses.course_name AS course, COUNT(students.id) AS student_count 
    FROM students 
    JOIN courses ON students.course = courses.id 
    GROUP BY courses.course_name;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const labels = [];
    const data = [];
    results.forEach(row => {
      labels.push(row.course);
      data.push(row.student_count);
    });
    const colors = ['rgb(79, 180, 219)', 'rgb(168, 82, 154)','rgb(81, 232, 194)','rgb(181, 153, 60)'];
    res.json({
      labels,
      data,
      colors
    });
  });
};


