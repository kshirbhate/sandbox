import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './RootRouter';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './store';
import reportWebVitals from './reportWebVitals';
import 'assets/scss/material-kit-react.scss?v=1.9.0';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <RootRouter />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
