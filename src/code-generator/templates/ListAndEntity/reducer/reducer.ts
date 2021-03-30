import { isStarted, isCompleted, isFailure } from 'restClient/utils';
import { FEATURE_NAME_CAPITAL_TYPES } from '../types';

const initialState = {
  loading: false,
  errors: [],
  list: [],
};

export type FEATURE_NAME_UPPER_CAMELState = Readonly<typeof initialState>;

const start = (state) => ({
  ...state,
  loading: true,
});

const failure = (state, action) => ({
  ...state,
  loading: false,
  errors: action.error,
});

const result = (state, action) => {
  const response = action?.response || {};

  return {
    ...state,
    loading: false,
    list: response?.data || [],
  };
};

export default (state: FEATURE_NAME_UPPER_CAMELState = initialState, action): FEATURE_NAME_UPPER_CAMELState => {
  switch (action.type) {
    case FEATURE_NAME_CAPITAL_TYPES.GET_FEATURE_NAME_CAPITAL_LIST: {
      if (isStarted(action.operation)) {
        return start(state);
      } else if (isCompleted(action.operation)) {
        return result(state, action);
      } else if (isFailure(action.operation)) {
        return failure(state, action);
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
