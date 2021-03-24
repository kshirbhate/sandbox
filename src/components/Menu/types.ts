import { StateProps, DispatchProps } from '.';

export interface IProps extends StateProps, DispatchProps {
  getMenus?: Function;
}

export const MENU_TYPES = {
  GET_MENUS: 'GET_MENUS',
  SHOW_MENU_MODAL: 'SHOW_MENU_MODAL',
};
