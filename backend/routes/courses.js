const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');
const prefix = '/_/courses'

router.get(prefix, coursesController.getCourses);
router.get(`${prefix}/paginate`, coursesController.getCoursesPaginate);
router.post(prefix, coursesController.addCourse);
router.put(`${prefix}/:id`, coursesController.updateCourse);
router.delete(`${prefix}/:id`, coursesController.deleteCourse);

module.exports = router;
