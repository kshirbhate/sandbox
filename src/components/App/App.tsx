import React, { useEffect } from 'react';
import { Header } from 'library';
import '@progress/kendo-theme-material/dist/all.css';
import './index.scss';
import { IProps } from './types';

const App: React.FC<IProps> = (props) => {
  useEffect(() => {
    props.updateSessionOnRefresh();
  }, []);

  return (
    <div className="app-container">
      <Header brand="Officebox" color="primary" />
      <div>{props.children}</div>
    </div>
  );
};

export default App;
