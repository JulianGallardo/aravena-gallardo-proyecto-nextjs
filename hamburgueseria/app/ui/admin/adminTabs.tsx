"use client"

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Dashboard = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Burgers</Tab>
        <Tab>Promos</Tab>
        <Tab>Extras</Tab>
        <Tab>Users</Tab>
      </TabList>

      <TabPanel>
        <h2>Burgers</h2>
        <p>Contenido relacionado con Burgers.</p>
      </TabPanel>
      <TabPanel>
        <h2>Promos</h2>
        <p>Contenido relacionado con Promos.</p>
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
