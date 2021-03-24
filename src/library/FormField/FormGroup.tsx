import './index.scss';

const FormGroup = ({ label, children }) => (
  <div className="form-group-field">
    <div className="form-group-field-label">{label}</div>
    <div className="form-group-field-children">{children}</div>
  </div>
);

export default FormGroup;
