import React, { useState, useEffect } from 'react';
import { Form } from '@progress/kendo-react-form';
import DecoratedField from 'DecoratedField';
import { PageContainer, FormField, Button, SessionBox, Loader } from 'library';
import { fields } from './fields';
import { IProps } from './types';
import { usePrevious } from 'hooks';
import './index.scss';
import { isEmpty, isEqual } from 'lodash';

const initialValues = {
  company: {},
  region: {},
  branch: {},
  unit: {},
  financialYear: {},
  name: 'kamlesh',
};

const mapFields = (props) => (field, i) => {
  const options = props[field.name];
  return (
    <DecoratedField
      key={i + field.name}
      {...field}
      inputcomponent={FormField}
      options={options}
      onChange={(e) => props.onChange(e, field.name)}
      disabled={options?.length === 1}
    />
  );
};

const Context: React.FC<IProps> = (props) => {
  const { loading, accessToken, getContextHierarchy, company, regionList, branchList, unitList, financialYearList } = props;
  const [region, setRegion] = useState([]);
  const [branch, setBranch] = useState([]);
  const [unit, setUnit] = useState([]);
  const [financialYear, setFinancialYear] = useState([]);
  const prevLoading = usePrevious(props.loading);

  useEffect(() => {
    if (!isEqual(prevLoading, loading) && prevLoading && !loading && accessToken) {
    }
  }, [loading]);

  useEffect(() => {
    props.initialize(initialValues);
  }, [props.initialize]);

  useEffect(() => {
    if (!isEmpty(accessToken)) {
      getContextHierarchy();
    }
  }, [getContextHierarchy, accessToken]);

  useEffect(() => {
    if (company?.length === 1) {
      props.dispatch(props.change('company', company[0]));
      setRegion(regionList.filter((it) => it.company === company[0]?.value));
    }
  }, [loading, company]);

  useEffect(() => {
    if (region?.length === 1) {
      props.dispatch(props.change('region', region[0]));
      setBranch(branchList.filter((it) => it.region === region[0]?.value));
    }
  }, [region]);

  useEffect(() => {
    if (branch?.length === 1) {
      props.dispatch(props.change('branch', branch[0]));
      setUnit(unitList.filter((it) => it.branch === branch[0]?.value));
    }
  }, [branch]);

  useEffect(() => {
    if (unit?.length === 1) {
      props.dispatch(props.change('unit', unit[0]));
      setFinancialYear(financialYearList.filter((it) => it.unit === unit[0]?.value));
    }
  }, [unit]);

  useEffect(() => {
    if (financialYear?.length === 1) {
      props.dispatch(props.change('financialYear', financialYear[0]));
    }
  }, [financialYear]);

  const onChange = (e, name) => {
    switch (name) {
      case 'company': {
        setRegion(regionList.filter((it) => it.company === e.value));
        setBranch([]);
        setUnit([]);
        setFinancialYear([]);
        return;
      }
      case 'region': {
        setBranch(branchList.filter((it) => it.region === e.value));
        setUnit([]);
        setFinancialYear([]);
        return;
      }
      case 'branch': {
        setUnit(unitList.filter((it) => it.branch === e.value));
        setFinancialYear([]);
        return;
      }
      case 'unit': {
        setFinancialYear(financialYearList.filter((it) => it.unit === e.value));
        return;
      }
    }
  };

  return (
    <PageContainer>
      <div className="context-container">
        <Form
          onSubmit={props.handleSubmit}
          render={(formRenderProps) => (
            <SessionBox title="Select Context">
              {fields.map(mapFields({ ...props, region, branch, unit, financialYear, onChange }))}
              <Button size="sm" color="primary" disabled={!formRenderProps.allowSubmit} onClick={props.handleSubmit}>
                Next
              </Button>
            </SessionBox>
          )}
        />
      </div>
      <Loader show={props.loading} />
    </PageContainer>
  );
};

export default Context;
