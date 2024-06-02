"use client"

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BurgerItems from './tabs/burger/burgerTab';
import PromoItems from './tabs/promos/promoTab';

const Dashboard = () => {
  return (
    <Tabs >
      <TabList>
        <Tab>Burgers</Tab>
        <Tab>Promos</Tab>
        <Tab>Extras</Tab>
        <Tab>Users</Tab>
      </TabList>

      <TabPanel>
        <BurgerItems />
      </TabPanel>

      <TabPanel>
        <PromoItems />
      </TabPanel>

      <TabPanel>
        <h2>Extras</h2>
        <p>Contenido relacionado con Extras.</p>
      </TabPanel>
      <TabPanel>
        <h2>Users</h2>
        <p>Contenido relacionado con Users.</p>
      </TabPanel>
    </Tabs>
  );
};

export default Dashboard;
