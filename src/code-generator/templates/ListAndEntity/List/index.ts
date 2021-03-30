import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getFormValues, initialize } from 'redux-form';
import { FILTER_FORM } from 'constants/formNames';
import List from './List';
import { IRootState } from 'reducers';
import {
  getFEATURE_NAME_UPPER_CAMEL,
  getFEATURE_NAME_UPPER_CAMELList,
  addFEATURE_NAME_UPPER_CAMEL,
  updateFEATURE_NAME_UPPER_CAMEL,
  deleteFEATURE_NAME_UPPER_CAMEL,
} from '../actions';

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
      getFEATURE_NAME_UPPER_CAMEL,
      getFEATURE_NAME_UPPER_CAMELList,
      addFEATURE_NAME_UPPER_CAMEL,
      updateFEATURE_NAME_UPPER_CAMEL,
      deleteFEATURE_NAME_UPPER_CAMEL,
    },
    dispatch
  );

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhance(List);
