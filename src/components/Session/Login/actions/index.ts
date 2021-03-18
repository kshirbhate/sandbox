import { getAsyncRestClient } from 'restClient';
import { LOGIN_TYPES } from '../types';

export const login = (data) => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.withAuthToken('Anonymous').$post(`/eshop/session/login`, data, LOGIN_TYPES.LOGIN);
};

export const updateSessionOnRefresh = () => (dispatch) => {
  dispatch({
    type: LOGIN_TYPES.UPDATE_SESSION_ON_REFRESH,
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGIN_TYPES.LOGOUT,
  });
};

export const updateSessionContext = (data) => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$post(`/eshop/session/UpdateContext`, data, LOGIN_TYPES.UPDATE_SESSION_CONTEXT);
};
