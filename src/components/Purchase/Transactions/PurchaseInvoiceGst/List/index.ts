import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getFormValues, initialize } from 'redux-form';
import { FILTER_FORM } from 'constants/formNames';
import List from './List';
import { IRootState } from 'reducers';
import { getPurchaseInvoiceGstList } from '../actions';

const mapStateToProps = (state: IRootState) => {
  const filterData: any = getFormValues(FILTER_FORM)(state);
  return {
    filterData: filterData,
    filterFormName: FILTER_FORM,
    session: state.session.session,
    loading: state.purchaseInvoiceGst.loading,
    list: state.purchaseInvoiceGst.list,
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      initialize,
      getPurchaseInvoiceGstList,
    },
    dispatch
  );

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhance(List);
