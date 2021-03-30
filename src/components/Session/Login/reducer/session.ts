import { isNil } from 'lodash';
import { isStarted, isCompleted, isFailure } from 'restClient/utils';
import { convertToCamelCase } from 'utils/fetch';
import { setAccessToken, getAccessToken, setSessionDetails, getSessionDetails, removeSession, setActiveTab, getActiveTab } from 'utils/localStorage';
import { LOGIN_TYPES } from 'components/Session/Login/types';

const initialState = {
  loading: false,
  errors: [],
  session: {} as any,
  accessToken: '',
  activeTab: 0,
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
    activeTab: getActiveTab(),
  };
};

const logoutResult = (state) => {
  removeSession();
  return {
    ...state,
    session: {},
    accessToken: '',
  };
};

const setActiveMenuResult = (state, action) => {
  setActiveTab(action.value);
  return {
    ...state,
    activeTab: action.value,
  };
};

export default (state: SessionState = initialState, action): SessionState => {
  switch (action.type) {
    case LOGIN_TYPES.UPDATE_SESSION_ON_REFRESH:
      return updateSessionOnRefreshResult(state);
    case LOGIN_TYPES.SET_ACTIVE_TAB:
      return setActiveMenuResult(state, action);
    case LOGIN_TYPES.LOGOUT:
      return logoutResult(state);
    case LOGIN_TYPES.LOGIN:
    case LOGIN_TYPES.UPDATE_SESSION_CONTEXT: {
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
