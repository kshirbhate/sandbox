import { isNil } from 'lodash';

const ACCESS_TOKEN = 'accessToken';
const SESSION_DETAILS = 'sessionDetails';

export const setAccessToken = (token) => {
  window.localStorage.setItem(ACCESS_TOKEN, token);
};

export const getAccessToken = () => {
  const token = window.localStorage.getItem(ACCESS_TOKEN);
  if (isNil(token)) {
    window.localStorage.removeItem(ACCESS_TOKEN);
    return '';
  }
  return token;
};

export const setSessionDetails = (session) => {
  window.localStorage.setItem(SESSION_DETAILS, JSON.stringify(session));
};

export const getSessionDetails = () => {
  const session = JSON.parse(window.localStorage.getItem(SESSION_DETAILS));
  if (isNil(session)) {
    window.localStorage.removeItem(SESSION_DETAILS);
    return null;
  }
  return session;
};
