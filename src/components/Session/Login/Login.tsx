import React from 'react';
import { Form } from '@progress/kendo-react-form';
import DecoratedField from 'DecoratedField';
import { PageContainer, FormField, Button, SessionBox } from 'library';
import { fields } from './fields';
import { IProps } from './types';
import './index.scss';

const mapFields = () => (field, i) => {
  return <DecoratedField key={i + field.name} {...field} inputcomponent={FormField} />;
};

const Login: React.FC<IProps> = (props) => {
  return (
    <PageContainer>
      <div className="login-container">
        <Form
          onSubmit={props.handleSubmit}
          render={(formRenderProps) => (
            <SessionBox title="Sign In">
              {fields.map(mapFields())}
              <Button size="sm" color="primary" type="submit" disabled={!formRenderProps.allowSubmit}>
                Login
              </Button>
            </SessionBox>
          )}
        />
      </div>
    </PageContainer>
  );
};

export default Login;
