const Technology = require("../models/Technology");
var moment = require("moment");


function parseDataToChart(technologies){
  const chartLine = {
    id: "",
    color: "hsl(207, 70%, 50%)",
    data: [],
  };
  const finalChartData = [];
  const dataAsMap = new Map();
  for (let i = 0; i < technologies.length; i++) {
    const element = technologies[i];
    element.date = new Date(element.date).toLocaleDateString();
    if (!dataAsMap.has(element.name)) {
      dataAsMap.set(element.name, [
        { x: element.date, y: element.jobs_total },
      ]);
    } else {
      dataAsMap.set(element.name, [
        ...dataAsMap.get(element.name),
        { x: element.date, y: element.jobs_total },
      ]);
    }
  }
  dataAsMap.forEach((v, k) => {
    chartLine.id = k;
    chartLine.data = v;
    finalChartData.push({ ...chartLine });
  });
  return finalChartData
}

//@desc Get all techs
//@route GET /api/v1/technologies
exports.getTechnologies = async (req, res, next) => {
  
  try {
    const technologies = await Technology.find();
    const finalChartData = parseDataToChart(technologies)
    finalChartData.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime()
    );
    return res.status(200).json({
      success: true,
      count: finalChartData.length,
      data: finalChartData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: `Server error ${error}` });
  }
};

//@route GET /api/v1/technologies/countries
exports.getTechnologiesByCountry = async (req, res, next) => {
  try {
    var startdate = moment();
    startdate = startdate.subtract(2, "days");
    startdate = startdate.format();
    const technologies = await Technology.find({
      date: {
        $gte: startdate,
      },
    });
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
