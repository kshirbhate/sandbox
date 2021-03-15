import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import App from './App';
import { IRootState } from 'reducers';
import { updateSessionOnRefresh } from 'components/Session/Login/actions';

const mapStateToProps = (state: IRootState) => ({
  accessToken: state.session.accessToken,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      updateSessionOnRefresh,
    },
    dispatch
  );

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhance(App);
