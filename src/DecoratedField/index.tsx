import React from 'react';
import { Field } from 'redux-form';
import './index.scss';

type DecoratedFieldProps = {
  name?: string;
  validate?: Function;
  getDropdownButtonLabel?: Function;
};

type FormGroupProps = {
  fieldClassName?: string;
  children?: React.ReactNode;
};

type DefaultInputComponentProps = {
  type?: string;
  options?: string[] | object;
};

const FormGroup: React.FC<FormGroupProps> = (props) => <div className={`form-group ${props.fieldClassName ? props.fieldClassName : ''}`}>{props.children}</div>;

const DefaultInputComponent: React.FC<DefaultInputComponentProps> = (props) => {
  return <input {...props} />;
};

export const FieldDecorations = (props) => {
  const inputName = props.input.name;
  const id = 'decoratedField_' + inputName;
  const { touched, error } = props.meta;
  const FormField = props.inputcomponent || DefaultInputComponent;
  const value = props.type === 'slider' && props.range ? (Array.isArray(props.input.value) ? props.input.value : [0]) : props.input.value;
  return (
    <FormGroup fieldClassName={props.fieldClassName}>
      <FormField htmlFor={id} {...props} {...props.input} type={props.type} format={props.dateFormat} value={value} error={touched ? error : null} />
    </FormGroup>
  );
};

const DecoratedField: React.FC<DecoratedFieldProps> = (props) => <Field validate={props.validate} key={props.name} {...props} component={FieldDecorations} />;

export default DecoratedField;
