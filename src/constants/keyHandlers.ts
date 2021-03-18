import { isEmpty, isNil } from 'lodash';

export const getHandleKeys = (type: string): Array<string> => {
  if (isEmpty(type) || isNil(type)) return [];
  const values = KEY_HANDLERS[type];
  return Object.keys(values).map((key) => values[key]);
};

export const CONTEXT_MODAL = 'CONTEXT_MODAL';

export const KEY_HANDLERS = {
  CONTEXT_MODAL: {
    open_modal: 'ctrl+h',
  },
};
