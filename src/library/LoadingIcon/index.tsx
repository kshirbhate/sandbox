import React from 'react';
import './index.scss';

type LoadingProps = {
  height?: number;
};

const LoadingIcon: React.FC<LoadingProps> = () => (
  <div className="loader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default LoadingIcon;
