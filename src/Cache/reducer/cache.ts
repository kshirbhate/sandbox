import { CACHE_TYPES, Cache } from '../actions/types';

const initialState = {
  loading: false,
  errorMessage: null as string,
  list: [] as Array<Cache>,
};

const addCacheResult = (state: CacheState, action) => {
  const validTill = new Date();
  validTill.setHours(validTill.getHours() + parseInt(process.env.REACT_APP_CACHE_VALIDTILL_HOUR));
  const cache: Cache = {
    ...action.response,
    id: validTill.getTime() || '',
    validTill: validTill,
  };

  return {
    ...state,
    list: [...state.list, cache],
  };
};

const updateAllResult = (state, action) => ({
  ...state,
  list: action.response,
});

export type CacheState = Readonly<typeof initialState>;

export default (state: CacheState = initialState, action): CacheState => {
  switch (action.type) {
    case CACHE_TYPES.ADD:
      return addCacheResult(state, action);
    case CACHE_TYPES.UPDATE_ALL:
      return updateAllResult(state, action);
    default:
      return state;
  }
};
