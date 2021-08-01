const express = require("express");
const router = express.Router();
const {
  getTechnologies,
  addTechnologies,
  deleteTechnologies,
} = require("./../../controllers/technologies-controller");

router.route("/").get(getTechnologies).post(addTechnologies);
router.route("/:id").delete(deleteTechnologies);

module.exports = router;
