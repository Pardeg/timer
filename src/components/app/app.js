import { Tabs } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import Timer from '../timer/timer';
import Countdown from '../countdown/countdown';
import '@csstools/normalize.css';
import './app.scss';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default class App extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={callback} className="container">
        <TabPane tab="Tab 1" key="1">
          <Timer />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <Countdown />
        </TabPane>
      </Tabs>
    );
  }
}
