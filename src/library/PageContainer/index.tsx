import React from 'react';
import './index.scss';

type PageContainerProps = {
  children?: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => <div className="page-container">{children}</div>;

export default PageContainer;
