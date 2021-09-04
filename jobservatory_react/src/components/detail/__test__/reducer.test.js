import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  addTech,
  fetchDataEnd,
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
  removeTech,
} from './../../../features/detail/action-creators';
import {
  detailReducer,
  initialState as detailInitialState,
  getIndexOfElementToRemove,
  getCountryIndexElementToRemove,
} from './../../../features/detail/reducer';

let jobsOpenByCountry;
let jobsOpenByDate;
let questionsOpen;

let server;

beforeEach(() => {
  jobsOpenByCountry = [
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
  server = setupServer(
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

  test('return state correctly when REMOVE_TECH action is trigger', () => {
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
    let newExpectedState = {
      jobsOpenByDate: jobsOpenByDate,
      jobsOpenByCountry: jobsOpenByCountry,
      questionsOpen: questionsOpen,
      loading: false,
      error: undefined,
    };
    expect(updatedState).toEqual(newExpectedState);
    const fetchDataRemoveAction = removeTech('Java');
    const updatedStateAfterRemove = detailReducer(
      detailInitialState,
      fetchDataRemoveAction,
    );
    newExpectedState = {
      jobsOpenByDate: [],
      jobsOpenByCountry: [],
      questionsOpen: [],
      loading: false,
      error: undefined,
    };
    expect(newExpectedState).toEqual(updatedStateAfterRemove);
  });

  test("return default state if the action doesn't exists", () => {
    const fetchAnyAction = { type: 'FOO_ACTION', payload: [] };
    const updatedState = detailReducer(detailInitialState, fetchAnyAction);
    expect(updatedState).toEqual(detailInitialState);
  });

  test('return state correctly when FETCH_DATA_END is trigger', () => {
    const fetchDataEndAction = fetchDataEnd();
    const updatedState = detailReducer(detailInitialState, fetchDataEndAction);
    const newExpectedState = {
      ...detailInitialState,
      loading: false,
    };
    expect(updatedState).toEqual(newExpectedState);
  });
  test('return correct array when the removeElements function are trigger', () => {
    const action = { payload: 'Java' };
    let index = getIndexOfElementToRemove(jobsOpenByDate, action);
    expect(index).not.toEqual(-1);
    //Second function that find index on countries
    index = getCountryIndexElementToRemove(jobsOpenByCountry, action);
    expect(index).not.toEqual(-1);
  });
});
