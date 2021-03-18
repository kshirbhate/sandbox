/*eslint-disable*/
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import cache, { CacheState } from 'Cache/reducer/cache';
import session, { SessionState } from 'components/Session/Login/reducer/session';
import context, { ContextState } from 'components/Session/Context/reducer/context';
import menu, { MenuState } from 'components/Menu/reducer/menu';

export interface IRootState {
  readonly form: any;
  readonly cache: CacheState;
  readonly session: SessionState;
  readonly context: ContextState;
  readonly menu: MenuState;
}

const rootReducer = combineReducers<IRootState>({
  form,
  cache,
  session,
  context,
  menu,
});

export default rootReducer;
