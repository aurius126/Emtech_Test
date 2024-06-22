const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const prefix = '/_/students';

router.get(prefix, (req, res) => {
  studentsController.getStudents(req, res);
});

router.post(prefix, (req, res) => {
  studentsController.addStudent(req, res);
});

router.put(`${prefix}/:id`, (req, res) => {
  studentsController.updateStudent(req, res);
});

router.delete(`${prefix}/:id`, (req, res) => {
  studentsController.deleteStudent(req, res);
});

module.exports = router;
