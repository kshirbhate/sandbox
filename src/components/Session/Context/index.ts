import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, initialize, change } from 'redux-form';
import { CONTEXT_FORM } from 'constants/formNames';
import { IRootState } from 'reducers';
import Context from './Context';
import { getContextHierarchy, setShowContextModal } from './actions';
import { updateSessionContext } from '../Login/actions';

const onSubmit = (formData, _dispatch, props) => {
  const data = {
    cmpnyId: formData.company?.value,
    regionId: formData.region?.value,
    branchId: formData.branch?.value,
    unitId: formData.unit?.value,
    fnnclYearId: formData.financialYear?.value,
  };
  props.updateSessionContext(data);
};

const form = {
  form: CONTEXT_FORM,
  onSubmit,
};

const mapStateToProps = (state: IRootState) => ({
  loading: state.session.loading,
  contextLoading: state.context.loading,
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
      updateSessionContext,
      setShowContextModal,
    },
    dispatch
  );

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), reduxForm(form));

export default enhance(Context);
