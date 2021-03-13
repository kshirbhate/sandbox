/*eslint-disable*/
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import cache, { CacheState } from '../Cache/reducer/cache';
import home, { HomeState } from '../components/Home/reducer/home';

export interface IRootState {
  readonly form: any;
  readonly home: HomeState;
  readonly cache: CacheState;
}

const rootReducer = combineReducers<IRootState>({
  form,
  home,
  cache,
});

export default rootReducer;
