const StackOverflowQuestion = require('../models/StackOverflowQuestion');
const helpers = require('./helpers/index.ts');

// @desc Get all questions
// @route GET /api/v1/questions
exports.getStackOverflowQuestions = async (req, res) => {
  try {
    const questions = await StackOverflowQuestion.find();
    const finalChartData = helpers.parseDataToChartQuestions(questions);
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
