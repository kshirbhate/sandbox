import { Primary } from 'library';
import React from 'react';
import './index.scss';

type PageHeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => (
  <div className="page-header">
    <div className="page-header-title">
      <Primary>
        <h3>{title}</h3>
      </Primary>
    </div>
    <div className="page-header-children">{children}</div>
  </div>
);

export default PageHeader;
