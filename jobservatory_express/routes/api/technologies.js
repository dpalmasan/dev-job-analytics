const express = require("express");
const router = express.Router();
const {
  getTechnologies,
  addTechnologies,
  deleteTechnologies,
  getTechnologiesByCountry,
} = require("./../../controllers/technologies-controller");

router.route("/").get(getTechnologies);
router.route("/countries").get(getTechnologiesByCountry);

module.exports = router;
