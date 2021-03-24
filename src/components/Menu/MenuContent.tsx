import { GridContainer, GridItem, Primary } from 'library';
import './index.scss';
import MenuItem from './MenuItem';

const MenuSection = ({ title = '', list = [] }) => {
  if (list?.length === 0) return null;
  return (
    <GridItem xs={12} sm={12} md={4} className="menu-section">
      <div className="menu-section-title">
        <Primary>
          <h3>{title}</h3>
        </Primary>
      </div>
      {list.map((menu, index) => (
        <MenuItem key={index} index={index} menu={menu} />
      ))}
    </GridItem>
  );
};

const MenuContent = (props) => (
  <GridContainer className="menu-contents">
    <MenuSection title="Transactions" list={props.data?.transactions} />
    <MenuSection title="Reports" list={props.data?.reports} />
    <MenuSection title="Masters" list={props.data?.masters} />
  </GridContainer>
);

export default MenuContent;
