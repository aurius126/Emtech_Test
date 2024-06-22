const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const prefix = '/_/dashboard';

router.get(`${prefix}/recent-students`, dashboardController.getRecentStudents);
router.get(`${prefix}/active-inactive-students`, dashboardController.getActiveInactiveStudents);
router.get(`${prefix}/students-count-by-period`, dashboardController.getStudentsCountByPeriod);
router.get(`${prefix}/students-inactive-count-by-period`, dashboardController.getInactiveStudentsCountByPeriod);
router.get(`${prefix}/students-count-by-course`, dashboardController.getStudentsCountByCourse);

module.exports = router;
