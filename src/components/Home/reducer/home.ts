import { isStarted, isCompleted, isFailure } from '../../../restClient/utils';
import { HOME_TYPES } from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: null as string,
  list: [] as Array<string>,
};

export type HomeState = Readonly<typeof initialState>;

const start = (state) => ({
  ...state,
  loading: true,
});

const failure = (state) => ({
  ...state,
  loading: false,
});

const result = (state, action) => {
  const { data = [] } = action?.response;
  return {
    ...state,
    loading: false,
    list: data.map((item) => item.first_name),
  };
};

export default (state: HomeState = initialState, action): HomeState => {
  switch (action.type) {
    case HOME_TYPES.FIND_ALL: {
      if (isStarted(action.operation)) {
        return start(state);
      } else if (isCompleted(action.operation)) {
        return result(state, action);
      } else if (isFailure(action.operation)) {
        return failure(state);
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
