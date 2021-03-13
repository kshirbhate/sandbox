import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import { CONTEXT_FORM } from 'constants/formNames';
import { IRootState } from 'reducers';
import Context from './Context';

const onSubmit = (_formData, _dispatch, _props) => {};

const form = {
  form: CONTEXT_FORM,
  onSubmit,
};

const mapStateToProps = (state: IRootState) => ({
  loading: state.session.loading,
  session: state.session.session,
  accessToken: state.session.accessToken,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), reduxForm(form));

export default enhance(Context);
