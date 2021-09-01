import { ChartLine } from "../../components/detail/Detail";

import {
  ADD_TECH,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_END,
  REMOVE_TECH,
} from "./actions";

interface Country {
  name: string;
  jobs: number;
}
interface DataByCountry {
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
  loading: boolean;
  error?: string;
}

const initialState: ChartState = {
  jobsOpenByDate: [],
  jobsOpenByCountry: [],
  questionsOpen: [],
  loading: false,
  error: undefined,
};

export function detailReducer(state = initialState, action: any): ChartState {
  switch (action.type) {
    case ADD_TECH: {
      console.log(`action.payload`, action.payload);
      const newJobsOpenByDate = [
        ...state.jobsOpenByDate,
        ...action.payload.jobsOpenByDate,
      ];
      const newJobsOpenByCountry = [
        ...state.jobsOpenByCountry,
        ...action.payload.jobsOpenByCountry,
      ];
      const newQuestionsOpen = [
        ...state.questionsOpen,
        ...action.payload.questionsOpen,
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
      const currentQuestionsOpen = [...state.jobsOpenByDate];
      const indexOfElementToRemove = currentJobsOpenByDate.findIndex(
        (value: any) => value.id === action.payload
      );
      const indexOfElementToRemoveOnCountry =
        currentJobsOpenByCountry.findIndex(
          (value: any) => value.id === action.payload
        );
      const indexOfElementToRemoveOnQuestion = currentQuestionsOpen.findIndex(
        (value: any) => value.id === action.payload
      );
      if (indexOfElementToRemove != null) {
        currentJobsOpenByDate.splice(indexOfElementToRemove, 1);
      }
      if (indexOfElementToRemoveOnCountry != null) {
        currentJobsOpenByCountry.splice(indexOfElementToRemoveOnCountry, 1);
      }
      if (indexOfElementToRemoveOnQuestion != null) {
        currentQuestionsOpen.splice(indexOfElementToRemoveOnQuestion, 1);
      }
      return {
        ...state,
        jobsOpenByDate: currentJobsOpenByDate,
        jobsOpenByCountry: currentJobsOpenByCountry,
        questionsOpen: currentQuestionsOpen,
      };
    }

    case FETCH_DATA_SUCCESS: {
      console.log(`data success`, action.payload);
      return {
        jobsOpenByDate: action.payload.jobsOpenByDate,
        jobsOpenByCountry: action.payload.jobsOpenByCountry,
        questionsOpen: action.payload.questionsOpen,
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
