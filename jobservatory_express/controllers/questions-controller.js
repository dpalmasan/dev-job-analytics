const StackOverflowQuestion = require('../models/StackOverflowQuestion');

function parseDataToChart(questions) {
  const chartLine = {
    id: '',
    color: 'hsl(207, 70%, 50%)',
    data: [],
  };
  const finalChartData = [];
  const dataAsMap = new Map();
  for (let i = 0; i < questions.length; i++) {
    const element = questions[i];
    element.date = new Date(element.date).toISOString();
    if (!dataAsMap.has(element.tag)) {
      dataAsMap.set(element.tag, [
        { x: element.date, y: element.count },
      ]);
    } else {
      dataAsMap.set(element.tag, [
        ...dataAsMap.get(element.tag),
        { x: element.date, y: element.count },
      ]);
    }
  }
  dataAsMap.forEach((v, k) => {
    chartLine.id = k;
    chartLine.data = v;
    finalChartData.push({ ...chartLine });
  });
  return finalChartData;
}

/* eslint-disable no-unused-vars */
// @desc Get all questions
// @route GET /api/v1/questions
exports.getStackOverflowQuestions = async (req, res, next) => {
  try {
    const questions = await StackOverflowQuestion.find();
    const finalChartData = parseDataToChart(questions);
    finalChartData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
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
