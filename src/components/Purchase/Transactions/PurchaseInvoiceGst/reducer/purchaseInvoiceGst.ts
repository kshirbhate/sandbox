import { isStarted, isCompleted, isFailure } from 'restClient/utils';
import { PURCHASE_INVOICE_GST_TYPES } from '../types';

const initialState = {
  loading: false,
  errors: [],
  list: [],
};

export type PurchaseInvoiceGstState = Readonly<typeof initialState>;

const start = (state) => ({
  ...state,
  loading: true,
});

const failure = (state, action) => ({
  ...state,
  loading: false,
  errors: action.error,
});

const result = (state, action) => {
  const response = action?.response || {};

  return {
    ...state,
    loading: false,
    list: response?.data || [],
  };
};

export default (state: PurchaseInvoiceGstState = initialState, action): PurchaseInvoiceGstState => {
  switch (action.type) {
    case PURCHASE_INVOICE_GST_TYPES.GET_PURCHASE_INVOICE_GST_LIST: {
      if (isStarted(action.operation)) {
        return start(state);
      } else if (isCompleted(action.operation)) {
        return result(state, action);
      } else if (isFailure(action.operation)) {
        return failure(state, action);
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
