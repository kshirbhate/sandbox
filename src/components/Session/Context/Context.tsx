import React, { useState, useEffect } from 'react';
import DecoratedField from 'DecoratedField';
import { PageContainer, FormField, Button, SessionBox, Loader } from 'library';
import { fields } from './fields';
import { IProps } from './types';
import { usePrevious } from 'hooks';
import './index.scss';
import { isEmpty, isEqual } from 'lodash';
import { useHistory } from 'react-router-dom';

const initialValues = {
  company: {},
  region: {},
  branch: {},
  unit: {},
  financialYear: {},
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
  const { loading, accessToken, getContextHierarchy, session, company, regionList, branchList, unitList, financialYearList } = props;
  const [region, setRegion] = useState([]);
  const [branch, setBranch] = useState([]);
  const [unit, setUnit] = useState([]);
  const [financialYear, setFinancialYear] = useState([]);
  const prevLoading = usePrevious(props.loading);
  const history = useHistory();

  useEffect(() => {
    if (!isEqual(prevLoading, loading) && prevLoading && !loading && accessToken) {
      props.setShowContextModal(false);
      history.push('/menu');
    }
  }, [loading]);

  // useEffect(() => {
  //   props.initialize(initialValues);
  // }, [props.initialize]);

  useEffect(() => {
    if (!isEmpty(session?.crrntCmpnyUnit?.id)) {
      props.dispatch(
        props.change('unit', {
          value: session?.crrntCmpnyUnit?.id,
          label: session?.crrntCmpnyUnit?.title,
        })
      );
    }
  }, []);

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
    props.dispatch(
      props.change('company', {
        value: session?.crrntCmpny?.id,
        label: session?.crrntCmpny?.title,
      })
    );
  }, [loading, company]);

  useEffect(() => {
    if (region?.length === 1) {
      props.dispatch(props.change('region', region[0]));
      setBranch(branchList.filter((it) => it.region === region[0]?.value));
    }
    props.dispatch(
      props.change('region', {
        value: session?.crrntCmpnyRegion?.id,
        label: session?.crrntCmpnyRegion?.title,
      })
    );
  }, [region]);

  useEffect(() => {
    if (branch?.length === 1) {
      props.dispatch(props.change('branch', branch[0]));
      setUnit(unitList.filter((it) => it.branch === branch[0]?.value));
    }
    props.dispatch(
      props.change('branch', {
        value: session?.crrntCmpnyBranch?.id,
        label: session?.crrntCmpnyBranch?.title,
      })
    );
  }, [branch]);

  useEffect(() => {
    if (unit?.length === 1) {
      props.dispatch(props.change('unit', unit[0]));
      setFinancialYear(financialYearList.filter((it) => it.unit === unit[0]?.value));
    }
    props.dispatch(
      props.change('unit', {
        value: session?.crrntCmpnyUnit?.id,
        label: session?.crrntCmpnyUnit?.title,
      })
    );
  }, [unit]);

  useEffect(() => {
    if (financialYear?.length === 1) {
      props.dispatch(props.change('financialYear', financialYear[0]));
    }
    props.dispatch(
      props.change('financialYear', {
        value: session?.crrntFnnclYear?.id,
        label: session?.crrntFnnclYear?.title,
      })
    );
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
        <form onSubmit={props.handleSubmit}>
          <SessionBox title="Select Context">
            {fields.map(mapFields({ ...props, region, branch, unit, financialYear, onChange }))}
            <Button size="sm" color="primary" type="submit" disabled={props.loading}>
              Next
            </Button>
          </SessionBox>
        </form>
      </div>
      <Loader show={props.contextLoading || props.loading} />
    </PageContainer>
  );
};

export default Context;
