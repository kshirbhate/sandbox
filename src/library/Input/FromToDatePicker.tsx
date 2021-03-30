import { useState, useEffect } from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { FormGroup } from 'library';
import './index.scss';
import { isEmpty, isNil } from 'lodash';

const FromToDatePicker = (props) => {
  const [date, setDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    if (!isNil(props.value) && !isEmpty(props.value)) {
      setDate(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    const value = {
      name: props.name,
      value: date,
    };
    props.onChange(value);
  }, [date]);

  const onChage = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };

  return (
    <div className={`from-to-date-picker`}>
      <FormGroup label="From">
        <DatePicker name="from" defaultValue={date.from} value={date.from} onChange={onChage} />
      </FormGroup>
      <FormGroup label="To">
        <DatePicker name="to" defaultValue={date.to} value={date.to} onChange={onChage} />
      </FormGroup>
    </div>
  );
};

export default FromToDatePicker;
