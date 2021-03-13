import React from 'react';
import LoadingIcon from '../LoadingIcon';
import './index.scss';

type LoaderProps = {
  show?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ show = false }) =>
  !show ? null : (
    <div className="loader-overlay">
      <LoadingIcon />
    </div>
  );

export default Loader;
