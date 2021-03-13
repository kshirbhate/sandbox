import { isNil } from 'lodash';
import { isStarted, isCompleted, isFailure } from 'restClient/utils';
import { convertToCamelCase } from 'utils/fetch';
import { setAccessToken, getAccessToken, setSessionDetails, getSessionDetails } from 'utils/localStorage';
import { LOGIN_TYPES } from 'components/Session/Login/types';

const initialState = {
  loading: false,
  errors: [],
  session: {},
  accessToken: '',
};

export type SessionState = Readonly<typeof initialState>;

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
  const login = action?.response || {};
  const details: any = convertToCamelCase(JSON.parse(login?.details));
  const token = details?.sssnId;
  setAccessToken(token);
  setSessionDetails(details);

  return {
    ...state,
    loading: false,
    session: (!isNil(details) && details) || null,
    accessToken: token,
  };
};

const updateSessionOnRefreshResult = (state) => {
  return {
    ...state,
    session: getSessionDetails(),
    accessToken: getAccessToken(),
  };
};

export default (state: SessionState = initialState, action): SessionState => {
  switch (action.type) {
    case LOGIN_TYPES.UPDATE_SESSION_ON_REFRESH:
      return updateSessionOnRefreshResult(state);
    case LOGIN_TYPES.LOGIN: {
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
