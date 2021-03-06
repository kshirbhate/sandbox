import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import { LOGIN_FORM } from 'constants/formNames';
import { IRootState } from 'reducers';
import Login from './Login';
import { login } from './actions';

const onSubmit = (formData, _dispatch, props) => {
  props.login(formData);
};

const form = {
  form: LOGIN_FORM,
  onSubmit,
};

const mapStateToProps = (state: IRootState) => ({
  loading: state.session.loading,
  session: state.session.session,
  accessToken: state.session.accessToken,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  );

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), reduxForm(form));

export default enhance(Login);
