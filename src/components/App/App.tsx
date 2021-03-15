import React, { useEffect } from 'react';
import { Header } from 'library';
import '@progress/kendo-theme-material/dist/all.css';
import './index.scss';
import { IProps } from './types';
import ContextMenu from 'components/Session/Context/ContextMenu';
import ContextRight from 'components/Session/Context/ContextRight';
import { isEmpty } from 'lodash';

const App: React.FC<IProps> = (props) => {
  const { accessToken } = props;
  const isActiveSession = !isEmpty(accessToken);
  useEffect(() => {
    props.updateSessionOnRefresh();
  }, []);

  return (
    <div className="app-container">
      <Header brand="Officebox" color="primary" leftLinks={isActiveSession && <ContextMenu />} rightLinks={isActiveSession && <ContextRight />} />
      <div>{props.children}</div>
    </div>
  );
};

export default App;
