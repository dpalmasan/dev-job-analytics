const express = require("express");
const router = express.Router();
const {
  getTechnologies,
  addTechnologies,
  deleteTechnologies,
  getTechnologiesByCountry,
} = require("./../../controllers/technologies-controller");

router.route("/").get(getTechnologies).post(addTechnologies);
router.route("/countries").get(getTechnologiesByCountry);
router.route("/:id").delete(deleteTechnologies);

module.exports = router;
