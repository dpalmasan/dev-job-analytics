const express = require('express');

const router = express.Router();
const {
  getStackOverflowQuestions,
} = require('../../controllers/questions-controller');

router.route('/').get(getStackOverflowQuestions);

module.exports = router;
