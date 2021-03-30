import React, { useEffect } from 'react';
import { IProps } from '../types';
import { convertToIdName } from 'utils/object';
import { PageContainer, PageHeader, ButtonToolbar, Loader, DataGrid } from 'library';
import Filter from 'components/Filter';
import { filterFields, initializeFilterValues } from './fields';
import { convertDateFormat } from 'utils/date';

const List: React.FC<IProps> = (props) => {
  const { session, list } = props;

  useEffect(() => {
    initializeFilterValues(props);
  }, [session, initializeFilterValues]);

  const onFetch = () => {
    const data = {
      fromDate: props.filterData?.fromTo?.from,
      toDate: props.filterData?.fromTo?.to,
      unitList: [convertToIdName(props.filterData?.unit)],
    };
    props.getPurchaseInvoiceGstList(data);
  };

  const onDelete = () => {};
  const onAdd = () => {};
  const onClear = () => {};

  const columns = [
    { field: 'unit.name', title: 'Unit Name', width: '160px' },
    { field: 'invntryDcmntDate', title: 'Invoice Date', width: '80px', renderComponent: (props) => <td>{convertDateFormat(props.dataItem[props.field])}</td> },
    { field: 'extrnlRfrnceNumber', title: 'Party Invoice Number', width: '120px' },
    { field: 'v_PartyBsnssUnitName', title: 'Supplier Name', width: '260px' },
    { field: 'finalTotal', title: 'Invoice Amount', width: '80px' },
    { field: 'workflowStatusName', title: 'Workflow Status', width: '80px' },
    { field: 'v_GSTRgstrdText', title: 'GST Registered', width: '60px' },
  ];

  return (
    <PageContainer>
      <PageHeader title="Purchase Invoice(GST)">
        <ButtonToolbar onFetch={onFetch} onDelete={onDelete} onAdd={onAdd} onClear={onClear} />
      </PageHeader>
      <Filter fields={filterFields} />
      <DataGrid list={list} columns={columns} />
      <Loader show={props.loading} />
    </PageContainer>
  );
};

export default List;
