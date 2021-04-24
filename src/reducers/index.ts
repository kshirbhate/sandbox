/*eslint-disable*/
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import FEATURE_NAME_LOWER_CAMEL from 'code-generator/templates/ListAndEntity/reducer/FEATURE_NAME_LOWER_CAMEL';
import cache, { CacheState } from 'Cache/reducer/cache';
import session, { SessionState } from 'components/Session/Login/reducer/session';
import context, { ContextState } from 'components/Session/Context/reducer/context';
import menu, { MenuState } from 'components/Menu/reducer/menu';
import purchaseInvoiceGst, { PurchaseInvoiceGstState } from 'components/Purchase/Transactions/PurchaseInvoiceGst/reducer/purchaseInvoiceGst';

export interface IRootState {
  readonly FEATURE_NAME_LOWER_CAMEL: any;
  readonly form: any;
  readonly cache: CacheState;
  readonly session: SessionState;
  readonly context: ContextState;
  readonly menu: MenuState;
  readonly purchaseInvoiceGst: PurchaseInvoiceGstState;
}

const rootReducer = combineReducers<IRootState>({
  FEATURE_NAME_LOWER_CAMEL,
  form,
  cache,
  session,
  context,
  menu,
  purchaseInvoiceGst,
});

export default rootReducer;
