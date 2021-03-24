import { DatePicker } from '@progress/kendo-react-dateinputs';
import { FormGroup } from 'library';
import './index.scss';

const FromToDatePicker = () => {
  return (
    <div className={`from-to-date-picker`}>
      <FormGroup label="From">
        <DatePicker defaultValue={new Date()} defaultShow />
      </FormGroup>
      <FormGroup label="To">
        <DatePicker defaultValue={new Date()} defaultShow />
      </FormGroup>
    </div>
  );
};

export default FromToDatePicker;
