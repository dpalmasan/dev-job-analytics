import { ChartLine } from '../../components/detail/Detail';
import { techMapping } from '../../core/tech-mapping';

import {
  ADD_TECH,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_END,
  REMOVE_TECH,
} from './actions';

interface Country {
  name: string;
  jobs: number;
}
export interface DataByCountry {
  countries: Country[];
  createdAt: string;
  date: string;
  jobs_total: number;
  name: string;
  _id: string;
}

interface ChartState {
  jobsOpenByDate: ChartLine[];
  jobsOpenByCountry: DataByCountry[];
  questionsOpen: ChartLine[];
  listOfTechs: string[];
  loading: boolean;
  error?: string;
}

export const initialState: ChartState = {
  jobsOpenByDate: [],
  jobsOpenByCountry: [],
  questionsOpen: [],
  listOfTechs: [],
  loading: false,
  error: undefined,
};

export const getIndexOfElementToRemove = (values: ChartLine[], action: any) => {
  return values.findIndex((value: any) => value.id === action.payload);
};

export function detailReducer(state = initialState, action: any): ChartState {
  switch (action.type) {
    case ADD_TECH: {
      console.log(`action.payload`, action.payload.data);
      const newJobsOpenByDate = [
        ...state.jobsOpenByDate,
        ...action.payload.data.jobsOpenByDate,
      ];
      const newJobsOpenByCountry = [
        ...state.jobsOpenByCountry,
        ...action.payload.data.jobsOpenByCountry,
      ];

      const matchCorrectId = techMapping.get(
        action.payload.data.questionsOpen[0].id,
      );
      action.payload.data.questionsOpen[0].id =
        matchCorrectId ?? action.payload.data.questionsOpen[0].id;

      const newQuestionsOpen = [
        ...state.questionsOpen,
        ...action.payload.data.questionsOpen,
      ];
      return {
        ...state,
        jobsOpenByDate: newJobsOpenByDate,
        jobsOpenByCountry: newJobsOpenByCountry,
        questionsOpen: newQuestionsOpen,
        loading: false,
      };
    }
    case REMOVE_TECH: {
      const currentJobsOpenByDate = [...state.jobsOpenByDate];
      const currentJobsOpenByCountry = [...state.jobsOpenByCountry];
      const currentQuestionsOpen = [...state.questionsOpen];
      const indexOfElementToRemove = getIndexOfElementToRemove(
        currentJobsOpenByDate,
        action,
      );
      const indexOfElementToRemoveOnQuestion = getIndexOfElementToRemove(
        currentQuestionsOpen,
        action,
      );

      currentJobsOpenByDate.splice(indexOfElementToRemove, 1);
      const filteredJobOpenByCountry = currentJobsOpenByCountry.filter(
        (value) => value.name !== action.payload,
      );
      currentQuestionsOpen.splice(indexOfElementToRemoveOnQuestion, 1);
      return {
        ...state,
        jobsOpenByDate: currentJobsOpenByDate,
        jobsOpenByCountry: filteredJobOpenByCountry,
        questionsOpen: currentQuestionsOpen,
      };
    }

    case FETCH_DATA_SUCCESS: {
      const listOfTechs = [];
      if (action.payload.jobsOpenByDate.length > 0) {
        for (let i = 0; i < action.payload.jobsOpenByDate.length; i++) {
          const job = action.payload.jobsOpenByDate[i];
          listOfTechs.push(job.id);
        }
      }
      return {
        jobsOpenByDate: action.payload.jobsOpenByDate,
        jobsOpenByCountry: action.payload.jobsOpenByCountry,
        questionsOpen: action.payload.questionsOpen,
        listOfTechs: listOfTechs,
        loading: false,
        error: undefined,
      };
    }
    case FETCH_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_DATA_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case FETCH_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
