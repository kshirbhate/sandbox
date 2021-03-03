import { getAsyncRestClient } from '../../../restClient';
import { HOME_TYPES } from './types';

export const find = () => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$get(`/api/users`, HOME_TYPES.FIND_ALL);
};
