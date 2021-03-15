import { Button } from 'library';
import './index.scss';

const Menu = ({ label, onClick }) => (
  <div className="context-menus-item">
    <Button color="primary" onClick={onClick}>
      {label}
    </Button>
  </div>
);

export default Menu;
