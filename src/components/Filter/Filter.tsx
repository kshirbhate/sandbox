import { useState } from 'react';
import DecoratedField from 'DecoratedField';
import { FormField, Button, Modal } from 'library';
import './index.scss';

const MapFields = (props) => {
  const { field } = props;
  return <DecoratedField {...field} inputcomponent={FormField} options={props[field.name]} />;
};

const FilterModal = (props) => (
  <Modal open={props.open} onClose={props.onClose}>
    {props.fields.map((field, i) => (i > 4 ? <MapFields {...props} key={i} field={field} /> : null))}
  </Modal>
);

const Filter = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="filter-container">
      {props.fields.map((field, i) => (i < 5 ? <MapFields {...props} key={i} field={field} /> : null))}
      {props.fields?.length > 5 && (
        <Button onClick={() => setShow(true)} className="filter-more-button" color="primary" size="sm">
          More
        </Button>
      )}
      {show && <FilterModal {...props} open={show} onClose={() => setShow(false)} />}
    </div>
  );
};

export default Filter;
