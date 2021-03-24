import { isEmpty, isNil } from 'lodash';

export const getHandleKeys = (type: string): Array<string> => {
  if (isEmpty(type) || isNil(type)) return [];
  const values = KEY_HANDLERS[type];
  return Object.keys(values).map((key) => values[key]);
};

export const getMultiHandleKeys = (types: Array<string>): Array<string> => {
  const list = [];
  types.forEach((type) => {
    const values = KEY_HANDLERS[type];
    Object.keys(values).forEach((key) => {
      list.push(values[key]);
    });
  });

  return list;
};

export const CONTEXT_MODAL = 'CONTEXT_MODAL';
export const MENU_MODAL = 'MENU_MODAL';

export const KEY_HANDLERS = {
  CONTEXT_MODAL: {
    open_modal: 'ctrl+h',
    close_modal: 'ctrl+x',
  },
  MENU_MODAL: {
    open_modal: 'ctrl+f',
    close_modal: 'ctrl+z',
  },
};
