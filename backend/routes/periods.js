const express = require('express');
const router = express.Router();
const periodsController = require('../controllers/periodsController');
const prefix = '/_/periods';

router.get(prefix, periodsController.getPeriods);
router.post(prefix, periodsController.addPeriod);
router.put(`${prefix}/:id`, periodsController.updatePeriod);
router.delete(`${prefix}/:id`, periodsController.deletePeriod);

module.exports = router;
