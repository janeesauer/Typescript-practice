// The five SOLID principles are:

// Single responsibility principle: a class should have one, and only one, reason to change;
// Open-closed principle: it should be possible to extend the behavoir of a class without  modifying it;
// Liskov Substitution principle: subclasses should be substitutable for their superclasses;
// Interface segregation principle: many small, client-specific interfaces are better than one general purpose interface;
// Dependency inversion principle: depends on abstractions not concretions;

// These principles, make it easy for a programmer to develop software that are easy to maintain 
// and extend. They also make it easy for developers to avoid code smells, 
// easily refactor code, and are also a part of the agile or adaptive software development.


// https://wanago.io/2020/02/03/applying-solid-principles-to-your-typescript-code/

// S - Single responsibility


// The following code is extracted from a part of the microfront end component i am currently working on.
// As part of a micro front end a section of the page contains a tab section that has three tabs in a
// tabPannel - Underneath the tabPannel the details of the selected tab is output to the screen.
// The component is only doing one function.  It could be modified to add more pannels
// and will most likely be changed to populate the tabs from a different source in the future.
// 
import React, { useState } from 'react'
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import './Tabs.scss';
const tabs = ["Vehicle", "Driver", "Cover"];
export const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabPanels = [
    {
      index: 0,
      component:
        <TabPanel key="vehicle">
          Vehicle Panel
        </TabPanel>,
    },
    {
      index: 1,
      component:
        <TabPanel key="driver">
          Driver Panel
        </TabPanel>,
    },
    {
      index: 2,
      component:
        <TabPanel key="cover">
          Cover Panel
        </TabPanel>
    }
  ];
  return (
    <div className="tabs-wrapper">
      <div className="tab-bar">
        {tabs.map((tab, index) =>
          <Tab
            text={tab}
            key={tab}
            id={tab}
            index={index}
            handleClick={setSelectedTab}
          />
        )}
      </div>
      {tabPanels.map(panel => {
        if (panel.index === selectedTab) return panel.component;
        return null;
      })}
    </div>
  )
};

// The Tab component displays the details of an Individual tab.  The component will be modified to 
// to output a different layout. No additional functionality can be added for the component to 
// fit into the single responsibility principle.
//
// 
