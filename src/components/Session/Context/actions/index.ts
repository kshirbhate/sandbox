import { getAsyncRestClient } from 'restClient';
import { CONTEXT_TYPES } from '../types';

export const getContextHierarchy = () => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$get(`/Sessions/PopulateContextHierarchy`, CONTEXT_TYPES.GET_CONTEXT_HIERARCHY);
};

export const setShowContextModal = (value) => (dispatch) => {
  dispatch({
    type: CONTEXT_TYPES.SHOW_CONTEXT_MODAL,
    value,
  });
};
