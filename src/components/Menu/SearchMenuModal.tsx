import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'reducers';
import { GridContainer, GridItem, Modal } from 'library';
import { Input } from '@progress/kendo-react-inputs';
import { FloatingLabel } from '@progress/kendo-react-labels';
import { debounce, isEmpty } from 'lodash';
import MenuItem from './MenuItem';
import './index.scss';

const MapSearchItem = ({ menu, index }) => {
  return (
    <GridContainer className={`menu-contents search-menu-item ${index % 2 ? 'even-row' : 'odd-row'}`}>
      <GridItem xs={4} md={1} className="search-menu-item-tabName">
        {menu.tabName}
      </GridItem>
      <GridItem xs={4} md={1} className="search-menu-item-subTabName">
        {menu.subTabName}
      </GridItem>
      <GridItem xs={4} md={6} className="menu-section">
        <MenuItem menu={menu} index={index} highlightRow={false} />
      </GridItem>
    </GridContainer>
  );
};

const SearchMenuModal = ({ show = false, onClose = () => {} }) => {
  const [searchValue, setSearchValue] = useState('');
  const searchList = useSelector((state: IRootState) => state.menu.searchList);
  const onChange = useRef(
    debounce((e: any) => {
      setSearchValue(String(e.target.value));
    }, 250)
  ).current;

  return (
    <Modal open={show} onClose={onClose} title="Search Menu">
      <div className="search-menu-container">
        <FloatingLabel label="Enter menu name to search" editorValue={searchValue}>
          <Input onChange={onChange} />
        </FloatingLabel>
        <div className="search-menu-item-container">
          {!isEmpty(searchValue) &&
            searchList
              .filter((searchItem) => searchItem.searchString.includes(searchValue))
              .map((menu, index) => <MapSearchItem key={index} menu={menu} index={index} />)}
        </div>
      </div>
    </Modal>
  );
};

export default SearchMenuModal;
