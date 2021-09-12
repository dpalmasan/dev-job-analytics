const moment = require('moment');
const helpers = require('./helpers/index.ts');
const Technology = require('../models/Technology');
const StackOverflowQuestion = require('../models/StackOverflowQuestion');
const { getRedisClient } = require('../config/redis-cache');

const redisClient = getRedisClient();

/* eslint-disable no-unused-vars */
// @desc Get all techs
// @route GET /api/v1/technologies
exports.getTechnologies = async (req, res) => {
  try {
    const techs = await redisClient.getAsync('technologies');
    if (techs) {
      const chartData = JSON.parse(techs);
      return res.status(200).json({
        success: true,
        count: chartData.length,
        data: chartData,
      });
    }
    const technologies = await Technology.find();
    const finalChartData = helpers.parseDataToChart(technologies);
    finalChartData.sort(
      (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
    );

    redisClient.setex('technologies', 600, JSON.stringify(finalChartData));
    return res.status(200).json({
      success: true,
      count: finalChartData.length,
      data: finalChartData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: `Server error ${error}` });
  }
};

// @desc one job by name
// @route GET /api/v1/technologies/:name
exports.getTechnologiesByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    let startdate = moment();
    startdate = startdate.subtract(2, 'days');
    startdate = startdate.format();

    const results = await redisClient.getAsync(`${name}:${startdate}`);
    if (results) {
      return res.status(200).json({
        success: true,
        count: 1,
        data: JSON.parse(results),
      });
    }
    const technologies = await Technology.find({
      name: {
        $eq: name,
      },
    });
    const jobsOpenByDate = helpers.parseDataToChart(technologies);
    const yesterdayTechnologies = await Technology.find({
      date: {
        $gte: startdate,
      },
    });

    const jobsOpenByCountry = yesterdayTechnologies.filter(
      (value) => value.name === name,
    );

    // TODO: We are using a JobserverRecord to Tag mapping
    const questions = await StackOverflowQuestion.find({
      tag: {
        $eq: helpers.techMapping[name],
      },
    });

    const questionsOpen = helpers.parseDataToChartQuestions(questions);
    const queryResults = { jobsOpenByDate, jobsOpenByCountry, questionsOpen };
    redisClient.setex(`${name}:${startdate}`, 600, JSON.stringify(queryResults));
    return res.status(200).json({
      success: true,
      count: 1,
      data: queryResults,
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
    const results = await redisClient.getAsync(`technologies/countries:${startdate}`);
    if (results) {
      const technologies = JSON.parse(results);
      return res.status(200).json({
        success: true,
        count: technologies.length,
        data: technologies,
      });
    }
    const technologies = await Technology.find({
      date: {
        $gte: startdate,
      },
    });
    redisClient.setex(`technologies/countries:${startdate}`, 600, JSON.stringify(technologies));
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
