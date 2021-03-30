import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { getContextHierarchy } from 'components/Session/Context/actions';
import { IRootState } from 'reducers';

type Props = {
  value: any;
  options: Array<any>;
  onChange: Function;
};

const UnitSelect: React.FC<Props> = ({ value, onChange, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContextHierarchy());
  }, [dispatch, getContextHierarchy]);

  const options = useSelector((state: IRootState) => state.context.unitList);

  const handleChange = (e) => {
    onChange(e);
  };

  return <ComboBox data={options} textField="label" dataItemKey="value" value={value} onChange={handleChange} {...rest} />;
};

export default UnitSelect;
