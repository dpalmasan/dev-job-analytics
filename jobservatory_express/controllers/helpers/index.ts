exports.parseDataToChartQuestions = (questions) => {
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
      dataAsMap.set(element.tag, [{ x: element.date, y: element.count }]);
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
  finalChartData.sort(
    (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
  );
  return finalChartData;
};

exports.parseDataToChart = (technologies) => {
  const chartLine = {
    id: '',
    color: 'hsl(207, 70%, 50%)',
    data: [],
  };
  const finalChartData = [];
  const dataAsMap = new Map();
  for (let i = 0; i < technologies.length; i++) {
    const element = technologies[i];
    element.date = new Date(element.date).toISOString();
    if (!dataAsMap.has(element.name)) {
      dataAsMap.set(element.name, [{ x: element.date, y: element.jobs_total }]);
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
  finalChartData.sort(
    (a, b) => new Date(a.x).getTime() - new Date(b.x).getTime(),
  );
  return finalChartData;
};
