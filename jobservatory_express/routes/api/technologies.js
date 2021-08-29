const express = require('express');

const router = express.Router();
const {
  getTechnologies,
  getTechnologiesByCountry,
  getTechnologiesByName,
} = require('../../controllers/technologies-controller');

router.route('/').get(getTechnologies);
router.route('/countries').get(getTechnologiesByCountry);
router.route('/:name').get(getTechnologiesByName);

module.exports = router;
