import React from 'react';
import { Field } from '@progress/kendo-react-form';
import { getInputComponent } from './getInputComponent';
import './index.scss';

const FormField = (props) => {
  const Component: React.ComponentType<any> = getInputComponent(props.type);

  const onChange = (e) => {
    props.onChange(e.value);
  };

  return <Field component={Component} {...props} onChange={onChange} />;
};

export default FormField;
