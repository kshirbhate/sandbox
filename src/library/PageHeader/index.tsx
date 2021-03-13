import React from 'react';
import './index.scss';

type PageHeaderProps = {
  title?: string;
  description?: string;
};

const PageHeader: React.FC<PageHeaderProps> = (props) => (
  <div className="page-header">
    <div className="page-header-title">
      <h2>{props.title}</h2>
    </div>
    {props.description && <div className="page-header-description">{props.description}</div>}
  </div>
);

export default PageHeader;
