import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm } from 'redux-form';
import { FILTER_FORM } from 'constants/formNames';
import Filter from './Filter';

const form = {
  form: FILTER_FORM,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose<any>(withRouter, connect(mapStateToProps, mapDispatchToProps), reduxForm(form));

export default enhance(Filter);
