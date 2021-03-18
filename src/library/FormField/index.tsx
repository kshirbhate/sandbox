import React from 'react';
import { getInputComponent } from './getInputComponent';
import './index.scss';

const FormField = (props) => {
  const Component: React.ComponentType<any> = getInputComponent(props.type);

  const onChange = (e) => {
    props.onChange(e.value);
  };

  return <Component {...props} onChange={onChange} onBlur={() => {}} />;
};

export default FormField;
