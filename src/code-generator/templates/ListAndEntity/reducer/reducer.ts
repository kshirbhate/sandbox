import { isStarted, isCompleted, isFailure } from 'restClient/utils';
import { FEATURE_NAME_CAPITAL_TYPES } from '../types';

const initialState = {
  loading: false,
  errors: [],
  list: [],
  entity: {},
};

export type FEATURE_NAME_UPPER_CAMELState = Readonly<typeof initialState>;

const startList = (state) => ({
  ...state,
  loading: true,
});

const resultList = (state, action) => {
  const response = action?.response || {};
  return {
    ...state,
    loading: false,
    list: response?.data || [],
  };
};

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
    entity: response?.data || {},
  };
};

const startAdd = (state) => ({
  ...state,
  loading: true,
});

const resultAdd = (state) => ({
  ...state,
  loading: true,
});

const startUpdate = (state) => ({
  ...state,
  loading: true,
});

const resultUpdate = (state) => ({
  ...state,
  loading: true,
});

const startDelete = (state) => ({
  ...state,
  loading: true,
});

const resultDelete = (state) => ({
  ...state,
  loading: true,
});

export default (state: FEATURE_NAME_UPPER_CAMELState = initialState, action): FEATURE_NAME_UPPER_CAMELState => {
  switch (action.type) {
    case FEATURE_NAME_CAPITAL_TYPES.GET_FEATURE_NAME_CAPITAL_LIST: {
      if (isStarted(action.operation)) {
        return startList(state);
      } else if (isCompleted(action.operation)) {
        return resultList(state, action);
      } else if (isFailure(action.operation)) {
        return failure(state, action);
      } else {
        return state;
      }
    }

    case FEATURE_NAME_CAPITAL_TYPES.GET_FEATURE_NAME_CAPITAL: {
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

    case FEATURE_NAME_CAPITAL_TYPES.ADD_FEATURE_NAME_CAPITAL: {
      if (isStarted(action.operation)) {
        return startAdd(state);
      } else if (isCompleted(action.operation)) {
        return resultAdd(state);
      } else if (isFailure(action.operation)) {
        return failure(state, action);
      } else {
        return state;
      }
    }

    case FEATURE_NAME_CAPITAL_TYPES.UPDATE_FEATURE_NAME_CAPITAL: {
      if (isStarted(action.operation)) {
        return startUpdate(state);
      } else if (isCompleted(action.operation)) {
        return resultUpdate(state);
      } else if (isFailure(action.operation)) {
        return failure(state, action);
      } else {
        return state;
      }
    }

    case FEATURE_NAME_CAPITAL_TYPES.DELETE_FEATURE_NAME_CAPITAL: {
      if (isStarted(action.operation)) {
        return startDelete(state);
      } else if (isCompleted(action.operation)) {
        return resultDelete(state);
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
