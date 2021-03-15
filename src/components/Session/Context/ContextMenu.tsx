import Menu from './Menu';
import './index.scss';

const ContextMenu = () => {
  const onClick = () => {};

  return (
    <div className="context-menus">
      <Menu label="Company" onClick={onClick} />
      <Menu label="Region" onClick={onClick} />
      <Menu label="Branch" onClick={onClick} />
      <Menu label="Unit" onClick={onClick} />
      <Menu label="2020-21" onClick={onClick} />
    </div>
  );
};

export default ContextMenu;
