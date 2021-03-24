import { Link } from 'react-router-dom';
import { GridContainer, GridItem } from 'library';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { setShowMenuModal } from './actions';
import './index.scss';

const MenuLink = ({ to = '', label = '' }) => {
  if (isEmpty(to)) return null;
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setShowMenuModal(false));
  };

  return (
    <GridItem className="menu-item-link">
      <Link to={to} onClick={onClick}>
        {label}
      </Link>
    </GridItem>
  );
};

const MenuItem = ({ menu, index, highlightRow = true }) => (
  <GridContainer className={`menu-item ${highlightRow && (index % 2 ? 'even-row' : 'odd-row')}`}>
    <GridItem xs={5} className="menu-item-name">
      {isEmpty(menu.menuItemURL) ? menu.menuItemDisplayName : <Link to={menu.menuItemURL}>{menu.menuItemDisplayName}</Link>}
    </GridItem>
    <GridItem xs={7} className="links-wrapper">
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

export default MenuItem;
