const StackOverflowQuestion = require("../models/StackOverflowQuestion");

//@desc Get all questions
//@route GET /api/v1/questions
exports.getStackOverflowQuestions = async (req, res, next) => {
  try {
    const questions = await StackOverflowQuestion.find();
    return res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: `Server error ${error}` });
  }
};

