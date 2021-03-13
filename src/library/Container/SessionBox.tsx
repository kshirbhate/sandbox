import React from 'react';
import { Primary } from 'library';
import './index.scss';

type Props = {
  children: React.ReactNode;
  title: string;
};

const SessionBox: React.FC<Props> = ({ children, title }) => (
  <div className="session-box">
    <div className="box-title">
      <Primary>
        <h3>{title}</h3>
      </Primary>
    </div>
    {children}
  </div>
);

export default SessionBox;
