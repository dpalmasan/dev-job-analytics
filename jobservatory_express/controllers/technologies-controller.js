const Technology = require("../models/Technology");
const StackOverflowQuestion = require("../models/StackOverflowQuestion");
var moment = require("moment");
var helpers = require('./helpers/index.ts')

/* eslint-disable no-unused-vars */
// @desc Get all techs
// @route GET /api/v1/technologies
exports.getTechnologies = async (req, res, next) => {
  try {
    const technologies = await Technology.find();
    const finalChartData = helpers.parseDataToChart(technologies)
    finalChartData.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
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

// @desc one job by name
// @route GET /api/v1/technologies/:name
exports.getTechnologiesByName = async (req, res, next) => {
  try {
    const name = req.params.name;
    var startdate = moment();
    startdate = startdate.subtract(2, "days");
    startdate = startdate.format();

    const technologies = await Technology.find({
      name: {
        $eq: name,
      },
    });
    const jobsOpenByDate = helpers.parseDataToChart(technologies)
    
    const yesterdayTechnologies = await Technology.find({
      date: {
        $gte: startdate,
      },
    });
    const jobsOpenByCountry = yesterdayTechnologies.filter((value) => value.name === name)

    //TODO: Fix this to handle name upperCase lowerCase diff
    const questions = await StackOverflowQuestion.find({
      tag: {
        $eq: name,
      },
    });

    const questionsOpen = helpers.parseDataToChartQuestions(questions)
    
    return res.status(200).json({
      success: true,
      count: 1,
      data: {jobsOpenByDate,jobsOpenByCountry, questionsOpen}
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: `Server error ${error}` });
  }
};

// @route GET /api/v1/technologies/countries
// @route GET /api/v1/technologies/countries
exports.getTechnologiesByCountry = async (req, res, next) => {
  try {
    let startdate = moment();
    startdate = startdate.subtract(2, 'days');
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
