import { MENU_TYPES } from '../types';
import { menus } from '../data';

export const getMenus = () => (dispatch) => {
  const response = menus;
  dispatch({
    type: MENU_TYPES.GET_MENUS,
    response,
  });
};

export const setShowMenuModal = (value) => (dispatch) => {
  dispatch({
    type: MENU_TYPES.SHOW_MENU_MODAL,
    value,
  });
};
