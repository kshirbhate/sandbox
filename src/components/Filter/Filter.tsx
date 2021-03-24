import DecoratedField from 'DecoratedField';
import { FormField } from 'library';
import './index.scss';

const mapFields = (props) => (field, i) => {
  return <DecoratedField key={i + field.name} {...field} inputcomponent={FormField} options={props[field.name]} />;
};

const Filter = (props) => <div className="filter-container">{props.fields.map(mapFields(props))}</div>;

export default Filter;
