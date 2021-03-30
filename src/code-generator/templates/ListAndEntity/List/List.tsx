import React, { useEffect } from 'react';
import { IProps } from '../types';
import { PageContainer, PageHeader, ButtonToolbar, Loader, DataGrid } from 'library';
import Filter from 'components/Filter';
import { filterFields, initializeFilterValues } from './fields';

const List: React.FC<IProps> = (props) => {
  const { session, list } = props;

  useEffect(() => {
    initializeFilterValues(props);
  }, [session, initializeFilterValues]);

  const onFetch = () => {
    const data = {
      fromDate: props.filterData?.fromTo?.from,
      toDate: props.filterData?.fromTo?.to,
    };
    props.getFEATURE_NAME_UPPER_CAMELList(data);
  };

  const onDelete = () => {};
  const onAdd = () => {};
  const onClear = () => {};

  const columns = [
    { field: 'id', title: 'Id', width: '160px' },
    { field: 'name', title: 'Name', width: '160px' },
  ];

  return (
    <PageContainer>
      <PageHeader title="FEATURE_NAME_UPPER_CAMEL">
        <ButtonToolbar onFetch={onFetch} onDelete={onDelete} onAdd={onAdd} onClear={onClear} />
      </PageHeader>
      <Filter fields={filterFields} />
      <DataGrid list={list} columns={columns} />
      <Loader show={props.loading} />
    </PageContainer>
  );
};

export default List;
