import {
  fetchCountriesData,
  fetchQuestionsData,
  fetchTechnologiesData,
  fetchTechnologyByNameData,
} from "../../api";
import { ChartLine } from "../../components/detail/Detail";
import {
  ADD_TECH,
  FETCH_DATA_END,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  REMOVE_TECH,
} from "./actions";

export const addTech = (data: ChartLine) => ({
  type: ADD_TECH,
  payload: data,
});

export const removeTech = (chartId: string) => ({
  type: REMOVE_TECH,
  payload: chartId,
});

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const fetchDataFailure = (error: any) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

export const fetchDataSuccess = (data: any) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchDataEnd = () => {
  return {
    type: FETCH_DATA_END,
  };
};

export const addTechData = (searchValue: string) => {
  return async (dispatch: any) => {
    dispatch(fetchDataRequest());
    try {
      const techByNameResult = await fetchTechnologyByNameData(searchValue);
      console.log(`techByNameResult`, techByNameResult);
      if (techByNameResult) {
        console.log(`techByNameResult`, techByNameResult);
        dispatch(addTech(techByNameResult));
      } else {
        dispatch(fetchDataEnd());
      }
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};

export const fetchData = () => {
  return async (dispatch: any) => {
    console.log("En proceso");
    dispatch(fetchDataRequest());
    try {
      const jobsOpenByDate = await fetchTechnologiesData();
      const jobsOpenByCountry = await fetchCountriesData();
      const questionsOpen = await fetchQuestionsData();
      const fetchedData = {
        jobsOpenByDate,
        jobsOpenByCountry,
        questionsOpen,
      };
      console.log(`fetchedData`, fetchedData);
      dispatch(fetchDataSuccess(fetchedData));
    } catch (error) {
      console.log(`error show show`, error);
      dispatch(fetchDataFailure(error));
    }
  };
};
