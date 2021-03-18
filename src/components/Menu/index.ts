import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Menu from './Menu';
import { IRootState } from 'reducers';
import { getMenus } from './actions';

const mapStateToProps = (state: IRootState) => ({
  accessToken: state.session.accessToken,
  loading: state.menu.loading,
  menus: state.menu.list,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getMenus,
    },
    dispatch
  );

export type StateProps = ReturnType<typeof mapStateToProps>;
export type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhance(Menu);
