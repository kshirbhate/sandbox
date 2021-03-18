import { Primary } from 'library';
import React from 'react';
import './index.scss';

type PageHeaderProps = {
  title?: string;
  description?: string;
};

const PageHeader: React.FC<PageHeaderProps> = (props) => (
  <div className="page-header">
    <div className="page-header-title">
      <Primary>
        <h3>{props.title}</h3>
      </Primary>
    </div>
    {props.description && <div className="page-header-description">{props.description}</div>}
  </div>
);

export default PageHeader;
