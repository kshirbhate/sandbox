import React, { useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { convertDateFormat } from 'utils/date';
import './index.scss';

type Props = {
  list: Array<any>;
  columns: Array<any>;
};

const DataGrid: React.FC<Props> = ({ list, columns }) => {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);

  const onPageChange = (e) => {
    setSkip(e.page?.skip);
    setTake(e.page?.take);
  };

  return (
    <Grid style={{ height: '400px' }} data={list} skip={skip} take={take} total={list.length} pageable={true} onPageChange={onPageChange}>
      {columns &&
        columns.map((column, index) => <GridColumn key={index} field={column.field} title={column.title} width={column.width} cell={column.renderComponent} />)}
    </Grid>
  );
};

export default DataGrid;
