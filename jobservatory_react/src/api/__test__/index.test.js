import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { dataHandlers } from '../../mocks/dataMock';
import {
  fetchTechnologiesData,
  fetchCountriesData,
  fetchQuestionsData,
  fetchTechnologyByNameData,
} from './../index';

let server = setupServer(...dataHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('index.ts', () => {
  test('should return correctly data from fetchTechnologiesData API', async () => {
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
    const technologies = await fetchTechnologiesData();
    expect(technologies).toEqual(finalData);
  });

  test('Error should be returned if the API fails - countries endpoint', async () => {
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
  test('Error should be returned if the API fails - questions endpoint', async () => {
    server.use(
      rest.get('http://localhost:5000/api/v1/questions', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    const questions = await fetchQuestionsData();
    const errorResponse = { ok: false, error: new Error('Server error') };
    expect(questions).toEqual(errorResponse);
  });

  test('Error should be returned if the API fails - questions endpoint', async () => {
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
});
