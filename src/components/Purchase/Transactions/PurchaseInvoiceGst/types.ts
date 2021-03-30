import { StateProps as ListStateProps, DispatchProps as ListDispatchProps } from './List';

export interface IProps extends ListStateProps, ListDispatchProps {
  initialize?: Function;
  getPurchaseInvoiceGstList?: Function;
}

export const PURCHASE_INVOICE_GST_TYPES = {
  GET_PURCHASE_INVOICE_GST_LIST: 'GET_PURCHASE_INVOICE_GST_LIST',
};
