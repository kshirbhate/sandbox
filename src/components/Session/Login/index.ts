import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import { LOGIN_FORM } from 'constants/formNames';
import Login from './Login';

const form = {
  form: LOGIN_FORM,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), reduxForm(form));

export default enhance(Login);
