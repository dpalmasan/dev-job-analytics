const StackOverflowQuestion = require('../models/StackOverflowQuestion');
const helpers = require('./helpers/index.ts');
const redisClient = require('../config/redis-cache');

// @desc Get all questions
// @route GET /api/v1/questions
exports.getStackOverflowQuestions = async (req, res) => {
  try {
    const questionsCache = await redisClient.getAsync('questions');
    if (questionsCache) {
      const chartData = JSON.parse(questionsCache);
      return res.status(200).json({
        success: true,
        count: chartData.length,
        data: chartData,
      });
    }
    const questions = await StackOverflowQuestion.find();
    const finalChartData = helpers.parseDataToChartQuestions(questions);
    redisClient.setex('questions', 600, JSON.stringify(finalChartData));
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
