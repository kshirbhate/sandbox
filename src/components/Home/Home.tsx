import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { IRootState } from '../../reducers';
import { find } from './actions';

interface IProps extends StateProps, DispatchProps {
  list: Array<string>;
  find?: Function;
  loading: boolean;
}

const Home: React.FC<IProps> = (props) => {
  useEffect(() => {
    props.find();
  }, [props.find]);
  return (
    <div>
      <h1>Home</h1>
      {props.loading && 'loading...'}
      {props.list && props.list.map((item, i) => <h4 key={i}>{item}</h4>)}
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  loading: state.home.loading,
  list: state.home.list,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      find,
    },
    dispatch
  );

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhance(Home);
