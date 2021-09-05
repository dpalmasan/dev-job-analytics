import { rest } from 'msw';
export const dataHandlers = [
  rest.get('http://localhost:5000/api/v1/technologies', (req, res, ctx) => {
    const jobsOpenByDate = [
      {
        color: 'hsl(207, 70%, 50%)',
        data: [{ x: '2021-09-01T00:00:00.000Z', y: 514836 }],
        id: 'Java',
      },
    ];
    const finalData = {
      count: jobsOpenByDate[0].data.length,
      data: jobsOpenByDate,
      success: true,
    };
    return res(ctx.status(200), ctx.json(finalData));
  }),
  rest.get(
    'http://localhost:5000/api/v1/technologies/countries',
    (req, res, ctx) => {
      const jobsOpenByCountry = [
        {
          _id: '612cfb05be86bd4e49c7711e',
          name: 'Java',
          date: '2021-08-30T00:00:00.000Z',
          jobs_total: 159905,
          countries: [
            {
              name: 'Estados Unidos',
              jobs: 64616,
            },
          ],
        },
      ];
      const finalData = {
        count: jobsOpenByCountry.length,
        data: jobsOpenByCountry,
        success: true,
      };
      return res(ctx.status(200), ctx.json(finalData));
    },
  ),
  rest.get('http://localhost:5000/api/v1/questions', (req, res, ctx) => {
    const questionsOpen = [
      {
        color: 'hsl(207, 70%, 50%)',
        data: [{ x: '8/8/2021', y: 380 }],
        id: 'Java',
      },
    ];
    const finalData = {
      count: questionsOpen.length,
      data: questionsOpen,
      success: true,
    };
    return res(ctx.status(200), ctx.json(finalData));
  }),
];
