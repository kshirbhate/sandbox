import { MENU_TYPES } from '../types';

const initialState = {
  loading: false,
  errors: [],
  list: [],
};

export type MenuState = Readonly<typeof initialState>;

const getMenuResult = (state, action) => ({
  ...state,
  list: action.response || [],
});

export default (state: MenuState = initialState, action): MenuState => {
  switch (action.type) {
    case MENU_TYPES.GET_MENUS:
      return getMenuResult(state, action);

    default:
      return state;
  }
};
