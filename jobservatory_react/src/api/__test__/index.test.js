import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { dataHandlers } from '../../mocks/dataMock';
import {
  fetchCountriesData,
  fetchQuestionsData,
  fetchTechnologyByNameData,
} from './../index';

let server = setupServer(...dataHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('index.ts', () => {
  test('Should return error if the api fails - countries endpoint', async () => {
    server.use(
      rest.get(
        'http://localhost:5000/api/v1/technologies/countries',
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );
    const country = await fetchCountriesData();
    const errorResponse = { ok: false, error: new Error('Server error') };
    expect(country).toEqual(errorResponse);
  });
  test('Should return error if the api fails - questions endpoint', async () => {
    server.use(
      rest.get('http://localhost:5000/api/v1/questions', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    const questions = await fetchQuestionsData();
    const errorResponse = { ok: false, error: new Error('Server error') };
    expect(questions).toEqual(errorResponse);
  });

  test('Should return error if the api fails - technologiesByName endpoint', async () => {
    const searchValue = 'Java';
    server.use(
      rest.get(
        `http://localhost:5000/api/v1/technologies/${searchValue}`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );
    const technologiesByName = await fetchTechnologyByNameData(searchValue);
    const errorResponse = { ok: false, error: new Error('Server error') };
    expect(technologiesByName).toEqual(errorResponse);
  });

  test('technologiesByName endpoint return data correctly', async () => {
    const questionsOpen = [
      {
        color: 'hsl(207, 70%, 50%)',
        data: [{ x: '8/8/2021', y: 380 }],
        id: 'React.js',
      },
    ];
    const jobsOpenByDate = [
      {
        color: 'hsl(207, 70%, 50%)',
        data: [{ x: '2021-09-01T00:00:00.000Z', y: 514836 }],
        id: 'React.js',
      },
    ];
    const jobsOpenByCountry = [
      {
        _id: '612cfb05be86bd4e49c7711e',
        name: 'React.js',
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
    const data = {
      questionsOpen,
      jobsOpenByDate,
      jobsOpenByCountry,
    };
    const dataExpected = {
      count: 1,
      success: true,
      data,
    };

    const searchValue = 'React.js';
    const technologiesByName = await fetchTechnologyByNameData(searchValue);
    expect(technologiesByName).toEqual(dataExpected);
  });
});
