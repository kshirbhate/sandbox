import { getAsyncRestClient } from 'restClient';
import { FEATURE_NAME_CAPITAL_TYPES } from '../types';

export const getFEATURE_NAME_UPPER_CAMEL = () => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$get('API_URL', FEATURE_NAME_CAPITAL_TYPES.GET_FEATURE_NAME_CAPITAL);
};

export const getFEATURE_NAME_UPPER_CAMELList = (data) => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$post('API_URL', data, FEATURE_NAME_CAPITAL_TYPES.GET_FEATURE_NAME_CAPITAL_LIST, {}, false);
};

export const addFEATURE_NAME_UPPER_CAMEL = (data) => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$post('API_URL', data, FEATURE_NAME_CAPITAL_TYPES.ADD_FEATURE_NAME_CAPITAL);
};

export const updateFEATURE_NAME_UPPER_CAMEL = (data) => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$put('API_URL', data, FEATURE_NAME_CAPITAL_TYPES.UPDATE_FEATURE_NAME_CAPITAL);
};

export const deleteFEATURE_NAME_UPPER_CAMEL = (id) => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$delete('API_URL', FEATURE_NAME_CAPITAL_TYPES.DELETE_FEATURE_NAME_CAPITAL, { id });
};
