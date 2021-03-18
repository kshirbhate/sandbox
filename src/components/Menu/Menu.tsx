import React, { useEffect, useState } from 'react';
import { IProps } from './types';
import { PageContainer, PageHeader, CustomTabs } from 'library';
import MenuContent from './MenuContent';
import './index.scss';

const Menu: React.FC<IProps> = (props) => {
  const [tabs, setTabs] = useState([]);

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

  return (
    <PageContainer>
      <PageHeader title="Menu" />
      <div className="menu-container">
        <CustomTabs headerColor="primary" tabs={tabs} />
      </div>
    </PageContainer>
  );
};

export default Menu;
