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
    element.date = new Date(element.date).toISOString();
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
