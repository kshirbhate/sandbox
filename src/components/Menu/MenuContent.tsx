import { Link } from 'react-router-dom';
import { GridContainer, GridItem, Primary } from 'library';
import './index.scss';
import { isEmpty } from 'lodash';

const MenuLink = ({ to = '', label = '' }) => {
  if (isEmpty(to)) return null;
  return (
    <GridItem className="menu-item-link">
      <Link to={to}>{label}</Link>
    </GridItem>
  );
};

const MenuItem = ({ menu, index }) => (
  <GridContainer className={`menu-item ${index % 2 ? 'even-row' : 'odd-row'}`}>
    <GridItem xs={4} className="menu-item-name">
      {isEmpty(menu.menuItemURL) ? menu.menuItemDisplayName : <Link to={menu.menuItemURL}>{menu.menuItemDisplayName}</Link>}
    </GridItem>
    <GridItem xs={8} className="links-wrapper">
      <GridContainer>
        <MenuLink to={menu.actionURL1} label={menu.actionDisplayName1} />
        <MenuLink to={menu.actionURL2} label={menu.actionDisplayName2} />
        <MenuLink to={menu.actionURL3} label={menu.actionDisplayName3} />
        <MenuLink to={menu.actionURL4} label={menu.actionDisplayName4} />
        <MenuLink to={menu.actionURL5} label={menu.actionDisplayName5} />
      </GridContainer>
    </GridItem>
  </GridContainer>
);

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
