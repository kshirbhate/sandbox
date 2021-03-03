/*eslint-disable*/
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import home, { HomeState } from '../components/Home/reducer/home';

export interface IRootState {
  readonly form: any;
  readonly home: HomeState;
}

const rootReducer = combineReducers<IRootState>({
  form,
  home,
});

export default rootReducer;
