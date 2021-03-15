import React from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';

type Props = {
  value: any;
  options: Array<any>;
  onChange: Function;
};

const ComboSelect: React.FC<Props> = ({ value, options = [], onChange, ...rest }) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return <ComboBox data={options} textField="label" dataItemKey="value" value={value} onChange={handleChange} {...rest} />;
};

export default ComboSelect;
