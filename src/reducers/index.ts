/*eslint-disable*/
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import cache, { CacheState } from 'Cache/reducer/cache';
import home, { HomeState } from 'components/Home/reducer/home';
import session, { SessionState } from 'components/Session/Login/reducer/session';
import context, { ContextState } from 'components/Session/Context/reducer/context';

export interface IRootState {
  readonly form: any;
  readonly home: HomeState;
  readonly cache: CacheState;
  readonly session: SessionState;
  readonly context: ContextState;
}

const rootReducer = combineReducers<IRootState>({
  form,
  home,
  cache,
  session,
  context,
});

export default rootReducer;
