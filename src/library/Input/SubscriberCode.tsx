import React, { useEffect, useState } from 'react';
import { Input } from '@progress/kendo-react-inputs';
import { FloatingLabel } from '@progress/kendo-react-labels';
import './index.scss';

const Code = ({ name, value, onChange }) => (
  <div className="subscriber-code-field">
    <Input name={name} value={value} onChange={onChange} maxLength={4} />
  </div>
);

const SubscriberCode = (props) => {
  const [formData, setFormData] = useState({
    subscriberCode1: '',
    subscriberCode2: '',
    subscriberCode3: '',
    subscriberCode4: '',
  });

  useEffect(() => {
    const e = {
      name: props.name,
      value: `${formData.subscriberCode1}${formData.subscriberCode2}${formData.subscriberCode3}${formData.subscriberCode4}`,
    };
    props.onChange(e);
  }, [formData]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') });
  };

  return (
    <div className="subscriber-code-container">
      <FloatingLabel
        label={props.label}
        editorValue={formData.subscriberCode1 || formData.subscriberCode2 || formData.subscriberCode3 || formData.subscriberCode4}
      >
        <div className="subscriber-code">
          <Code name="subscriberCode1" value={formData.subscriberCode1} onChange={onChange} />
          <Code name="subscriberCode2" value={formData.subscriberCode2} onChange={onChange} />
          <Code name="subscriberCode3" value={formData.subscriberCode3} onChange={onChange} />
          <Code name="subscriberCode4" value={formData.subscriberCode4} onChange={onChange} />
        </div>
      </FloatingLabel>
    </div>
  );
};

export default SubscriberCode;
