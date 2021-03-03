import React from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './index.scss';

type AppProps = {
  children?: React.ReactNode;
};

const App: React.FC<AppProps> = (props) => {
  return <div className="app-container">{props.children}</div>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhance(App);
