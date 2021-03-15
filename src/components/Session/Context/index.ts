import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, initialize, change } from 'redux-form';
import { CONTEXT_FORM } from 'constants/formNames';
import { IRootState } from 'reducers';
import Context from './Context';
import { getContextHierarchy } from './actions';

const onSubmit = (_formData, _dispatch, _props) => {};

const form = {
  form: CONTEXT_FORM,
  onSubmit,
};

const mapStateToProps = (state: IRootState) => ({
  loading: state.session.loading || state.context.loading,
  session: state.session.session,
  accessToken: state.session.accessToken,
  company: state.context.companyList,
  regionList: state.context.regionList,
  branchList: state.context.branchList,
  unitList: state.context.unitList,
  financialYearList: state.context.financialYearList,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getContextHierarchy,
      change,
      initialize,
    },
    dispatch
  );

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), reduxForm(form));

export default enhance(Context);
