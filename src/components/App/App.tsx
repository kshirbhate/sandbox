import React from 'react';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import '@progress/kendo-theme-material/dist/all.css';
import { Header } from 'library';
import './index.scss';

type AppProps = {
  children?: React.ReactNode;
};

const App: React.FC<AppProps> = (props) => {
  return (
    <div className="app-container">
      <Header brand="Officebox" color="primary" />
      <div>{props.children}</div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));

export default enhance(App);
