import React from 'react';
import { IProps } from '../types';
import { PageContainer, PageHeader, ButtonToolbar } from 'library';
import Filter from 'components/Filter';
import { filterFields } from './fields';

const List: React.FC<IProps> = () => {
  const onFetch = () => {};
  const onDelete = () => {};
  const onAdd = () => {};
  const onClear = () => {};

  return (
    <PageContainer>
      <PageHeader title="Purchase Invoice(GST)">
        <ButtonToolbar onFetch={onFetch} onDelete={onDelete} onAdd={onAdd} onClear={onClear} />
      </PageHeader>
      <Filter fields={filterFields} />
    </PageContainer>
  );
};

export default List;
