import React from 'react';
import { getInputComponent } from './getInputComponent';
import FormGroup from './FormGroup';
import './index.scss';

const FormField = (props) => {
  const Component: React.ComponentType<any> = getInputComponent(props.type);

  const onChange = (e) => {
    props.onChange(e.value);
  };

  return (
    <FormGroup label={props.label}>
      <Component {...props} label="" onChange={onChange} onBlur={() => {}} />
    </FormGroup>
  );
};

export default FormField;
