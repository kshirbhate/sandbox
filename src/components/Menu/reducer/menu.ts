import { MENU_TYPES } from '../types';

const initialState = {
  loading: false,
  errors: [],
  list: [],
  searchList: [],
  showMenuModal: false,
};

export type MenuState = Readonly<typeof initialState>;

const constructSubMenuList = (type, tabItem, searchList) => {
  tabItem[type]?.forEach((menuItem) => {
    const menu = {
      tabName: tabItem.name,
      subTabName: type,
      ...menuItem,
    };
    let searchString = '';
    Object.keys(menu).forEach((key) => {
      searchString = searchString + menu[key].toLowerCase();
    });
    searchList.push({
      ...menu,
      searchString,
    });
  });

  return searchList;
};

const constructSearchList = (list) => {
  let searchList = [];
  list?.forEach((tabItem) => {
    searchList = constructSubMenuList('transactions', tabItem, searchList);
    searchList = constructSubMenuList('reports', tabItem, searchList);
    searchList = constructSubMenuList('masters', tabItem, searchList);
  });
  return searchList;
};

const getMenuResult = (state, action) => {
  const list = action.response || [];
  return {
    ...state,
    list: list,
    searchList: constructSearchList(list),
  };
};

const showMenuModalResult = (state, action) => ({
  ...state,
  showMenuModal: action.value,
});

export default (state: MenuState = initialState, action): MenuState => {
  switch (action.type) {
    case MENU_TYPES.SHOW_MENU_MODAL:
      return showMenuModalResult(state, action);
    case MENU_TYPES.GET_MENUS:
      return getMenuResult(state, action);

    default:
      return state;
  }
};
