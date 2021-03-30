import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from 'reducers';
import { IProps } from './types';
import { PageContainer, PageHeader, CustomTabs } from 'library';
import MenuContent from './MenuContent';
import { setActiveTab } from 'components/Session/Login/actions';
import './index.scss';

const Menu: React.FC<IProps> = (props) => {
  const [tabs, setTabs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    props.getMenus();
  }, [props.getMenus]);

  useEffect(() => {
    const tabsAndMenus = [];
    props.menus.forEach((menu) => {
      tabsAndMenus.push({
        tabName: menu.name,
        tabContent: <MenuContent data={menu} />,
      });
    });
    setTabs(tabsAndMenus);
  }, [props.menus]);

  const activeTab = useSelector((state: IRootState) => state.session.activeTab);

  const setActive = (value) => {
    dispatch(setActiveTab(value));
  };

  return (
    <PageContainer>
      <PageHeader title="Menu" />
      <div className="menu-container">
        <CustomTabs headerColor="primary" tabs={tabs} active={activeTab} setActive={setActive} />
      </div>
    </PageContainer>
  );
};

export default Menu;
