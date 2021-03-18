import { MENU_TYPES } from '../types';
import { menus } from '../data';

export const getMenus = () => (dispatch) => {
  const response = menus;
  dispatch({
    type: MENU_TYPES.GET_MENUS,
    response,
  });
};
