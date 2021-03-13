import { isNil } from 'lodash';

export const getDefaultOptions = (isToken = true) => ({
  headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Access-Token': isToken ? window.localStorage.getItem('officebox-session') : '' },
  credentials: 'same-origin',
});

export const throwExceptionErrors = (response) => {
  if (!response.hasErrors || response.length > 0 || response.ErrorCount === 0 || response.DataCount > 0) return;
  const error = new Error(response.message);
  error.code = response.message || '';
  error.values = [];
  error.message = response.message || '';
  throw error;
};

export const convertToCamelCase = (o) => {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = convertToCamelCase(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
        value = o[origKey];
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = convertToCamelCase(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
};

export const convertObRespose = (response) => {
  if (response && !isNil(response.Data) && response.Data.length > 0) {
    return convertToCamelCase(response.Data[0]);
  } else if (!isNil(response) && response.length > 0) {
    return convertToCamelCase(response);
  }
};
