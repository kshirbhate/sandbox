import React, { useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reduxForm, initialize } from 'redux-form';
import { Form } from '@progress/kendo-react-form';
import DecoratedField from '../../../DecoratedField';
import { FEATURE_ENTITY_FORM } from '../../../constants/formNames';
import { PageContainer, PageHeader, FormField } from '../../../library';
import { fields } from './fields';

const initialValues = {
  firstName: '',
  lastName: '',
};

interface IProps extends StateProps, DispatchProps {
  initialize?: Function;
}

const mapFields = () => (field, i) => {
  return <DecoratedField key={i + field.name} {...field} inputcomponent={FormField} />;
};

const FeatureEntity: React.FC<IProps> = (props) => {
  useEffect(() => {
    props.initialize(props.filter);
  }, []);

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <PageHeader title="Feature Entity Page" />
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <div>
            {fields.map(mapFields())}
            <button type={'submit'} className="k-button" disabled={!formRenderProps.allowSubmit}>
              Submit
            </button>
          </div>
        )}
      />
    </PageContainer>
  );
};

const form = {
  form: FEATURE_ENTITY_FORM,
};

const mapStateToProps = () => ({
  filter: { ...initialValues },
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      initialize,
    },
    dispatch
  );

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const enhance = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), reduxForm(form));

export default enhance(FeatureEntity);
