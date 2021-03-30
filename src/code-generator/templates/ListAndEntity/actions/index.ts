import { getAsyncRestClient } from 'restClient';
import { FEATURE_NAME_CAPITAL_TYPES } from '../types';

export const getFEATURE_NAME_UPPER_CAMELList = (data) => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$post(`API_URL`, data, FEATURE_NAME_CAPITAL_TYPES.GET_FEATURE_NAME_CAPITAL_LIST, {}, false);
};
