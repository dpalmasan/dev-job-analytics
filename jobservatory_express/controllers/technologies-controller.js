const Technology = require("../models/Technology");

//@desc Get all techs
//@route GET /api/v1/technologies
exports. = async (req, res, next) => {
  try {
    const technologies = await Technology.find();
    return res.status(200).json({
      success: true,
      count: technologies.length,
      data: technologies,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: `Server error ${error}` });
  }
};

//@desc add tech
//@route POST /api/v1/technologies
exports.addTechnologies = async (req, res, next) => {
  try {
    const { name, jobs_open } = req.body;
    const technology = await Technology.create({ name, jobs_open });
    return res.status(201).json({
      success: true,
      count: 1,
      data: technology,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      return res.status(500).json({ success: false, error: `${error}` });
    }
  }
};

//@desc Delete tech
//@route DELETE /api/v1/technologies/:id
exports.deleteTechnologies = async (req, res, next) => {
  try {
    const id = req.params.id;
    const technology = await Technology.findById(id);
    if (!technology) {
      return res
        .status(404)
        .json({ success: false, error: "No technology found" });
    } else {
      await technology.remove();
      return res.status(200).json({
        success: true,
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error}` });
  }
};
