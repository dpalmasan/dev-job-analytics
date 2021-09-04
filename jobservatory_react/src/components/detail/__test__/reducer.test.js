import {
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
  addTech,
} from './../../../features/detail/action-creators';
import {
  detailReducer,
  initialState as detailInitialState,
} from './../../../features/detail/reducer';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

let jobsOpenByCountry;
let jobsOpenByDate;
let questionsOpen;

beforeEach(() => {
  jobsOpenByCountry = [
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

  jobsOpenByDate = [
    {
      color: 'hsl(207, 70%, 50%)',
      data: [{ x: '8/8/2021', y: 514836 }],
      id: 'Java',
    },
  ];

  questionsOpen = [
    {
      color: 'hsl(207, 70%, 50%)',
      data: [{ x: '8/8/2021', y: 380 }],
      id: 'Java',
    },
  ];
  setupServer(
    rest.get(
      'http://localhost:5000/api/v1/technologies/:name',
      (req, res, ctx) => {
        return res(
          ctx.json({ jobsOpenByCountry, jobsOpenByDate, questionsOpen }),
        );
      },
    ),
  );
});

describe('detailReducer', () => {
  test('return state correctly when FETCH_DATA_REQUEST action is trigger', () => {
    const fetchDataRequestAction = fetchDataRequest();
    const updatedState = detailReducer(
      detailInitialState,
      fetchDataRequestAction,
    );
    const newExpectedState = {
      ...detailInitialState,
      loading: true,
    };
    expect(updatedState).toEqual(newExpectedState);
  });
  test('return state correctly when FETCH_DATA_FAILURE action is trigger', () => {
    const fetchDataFailureAction = fetchDataFailure('This is an error');
    const updatedState = detailReducer(
      detailInitialState,
      fetchDataFailureAction,
    );
    const newExpectedState = {
      ...detailInitialState,
      loading: false,
      error: 'This is an error',
    };
    expect(updatedState).toEqual(newExpectedState);
  });

  test('return state correctly when FETCH_DATA_SUCCESS action is trigger', () => {
    const fetchedData = {
      jobsOpenByDate,
      jobsOpenByCountry,
      questionsOpen,
    };

    const fetchDataSuccessAction = fetchDataSuccess(fetchedData);
    const updatedState = detailReducer(
      detailInitialState,
      fetchDataSuccessAction,
    );
    const newExpectedState = {
      jobsOpenByDate: jobsOpenByDate,
      jobsOpenByCountry: jobsOpenByCountry,
      questionsOpen: questionsOpen,
      loading: false,
      error: undefined,
    };
    expect(updatedState).toEqual(newExpectedState);
  });

  test('return state correctly when ADD_TECH action is trigger', async () => {
    const addTechAction = addTech({
      jobsOpenByDate,
      jobsOpenByCountry,
      questionsOpen,
    });
    const updatedState = detailReducer(detailInitialState, addTechAction);
    const newExpectedState = {
      jobsOpenByDate: jobsOpenByDate,
      jobsOpenByCountry: jobsOpenByCountry,
      questionsOpen: questionsOpen,
      loading: false,
      error: undefined,
    };
    expect(updatedState).toEqual(newExpectedState);
  });
});
