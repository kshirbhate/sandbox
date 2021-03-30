import { getAsyncRestClient } from 'restClient';
import { PURCHASE_INVOICE_GST_TYPES } from '../types';

export const getPurchaseInvoiceGstList = (data) => (dispatch) => {
  const restClient = getAsyncRestClient(dispatch);
  restClient.$post(`/PurchaseInvoice/FetchGST`, data, PURCHASE_INVOICE_GST_TYPES.GET_PURCHASE_INVOICE_GST_LIST, {}, false);
};
