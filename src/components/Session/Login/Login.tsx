import React, { useEffect } from 'react';
import { Form } from '@progress/kendo-react-form';
import DecoratedField from 'DecoratedField';
import { PageContainer, FormField, Button, SessionBox, Loader } from 'library';
import { useHistory } from 'react-router-dom';
import { fields } from './fields';
import { IProps } from './types';
import { usePrevious } from 'hooks';
import './index.scss';
import { isEqual } from 'lodash';

const mapFields = () => (field, i) => {
  return <DecoratedField key={i + field.name} {...field} inputcomponent={FormField} />;
};

const Login: React.FC<IProps> = (props) => {
  const { loading, accessToken } = props;
  const prevLoading = usePrevious(props.loading);
  const history = useHistory();
  useEffect(() => {
    if (!isEqual(prevLoading, loading) && prevLoading && !loading && accessToken) {
      history.push('/context');
    }
  }, [loading]);

  return (
    <PageContainer>
      <div className="login-container">
        <Form
          onSubmit={props.handleSubmit}
          render={(formRenderProps) => (
            <SessionBox title="Sign In">
              {fields.map(mapFields())}
              <Button size="sm" color="primary" disabled={!formRenderProps.allowSubmit} onClick={props.handleSubmit}>
                Login
              </Button>
            </SessionBox>
          )}
        />
      </div>
      <Loader show={props.loading} />
    </PageContainer>
  );
};

export default Login;
