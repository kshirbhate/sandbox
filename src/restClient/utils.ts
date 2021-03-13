import { differenceInMinutes } from 'date-fns';
import { CACHE_TYPES, Cache } from '../Cache/actions/types';
import store from '../store';

export const OPERATIONS = {
  BEGINS: 'BEGINS',
  COMPLETE: 'COMPLETE',
  FAILURE: 'FAILURE',
};

export const startAction = (type: string): any => {
  store.dispatch({
    operation: OPERATIONS.BEGINS,
    type: type,
  });
};

export const completeAction = (type: string, response: any, args: any): any => {
  store.dispatch({
    operation: OPERATIONS.COMPLETE,
    type: type,
    response,
    args,
  });
};

export const errorAction = (type: string, error: any): any => {
  store.dispatch({
    operation: OPERATIONS.FAILURE,
    type,
    error,
  });
};

export const isStarted = (operation) => operation === OPERATIONS.BEGINS;

export const isCompleted = (operation) => operation === OPERATIONS.COMPLETE;

export const isFailure = (operation) => operation === OPERATIONS.FAILURE;

export const getCacheData = (name: string, type: string): Cache => {
  const list = store.getState()?.cache?.list?.filter((cache) => differenceInMinutes(new Date(cache?.validTill), new Date()) >= 0);
  completeAction(CACHE_TYPES.UPDATE_ALL, list, {});
  const cache = list?.find((cache) => cache.name === name && cache.type === type);
  return cache;
};
