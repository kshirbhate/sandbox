import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import List from './List';
import { IRootState } from 'reducers';

const mapStateToProps = (state: IRootState) => ({
  accessToken: state.session.accessToken,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhance(List);
