import React from 'react';
import './timer.scss';
import { Button, Layout } from 'antd';

const { Header, Content, Footer } = Layout;
export default class Timer extends React.Component {
  state = {
    isActive: false,
    start: 0,
    interval: 0,
  };

  componentWillUnmount() {
    const { interval } = this.state;
    if (interval === 0) clearInterval(this.timer);
  }

  startTimer = () => {
    this.setState(({ start, interval }) => ({
      isActive: true,
      interval: interval + 300,
    }));
    this.timer = setTimeout(this.startTimer, 300);
  };

  resetTimer = () => {
    this.setState(() => ({ isActive: false, interval: 0 }));
    clearTimeout(this.timer);
  };

  pauseTimer = () => {
    this.setState(({ interval, isActive }) => ({ start: interval, isActive: !isActive }));
    clearTimeout(this.timer);
  };

  render() {
    const { isActive, interval } = this.state;
    const startButton = (
      <Button className="btn" onClick={this.startTimer}>
        Start
      </Button>
    );
    const pauseButton = (
      <Button className="btn" onClick={this.pauseTimer}>
        Pause
      </Button>
    );
    const centiseconds = `0${Math.floor(interval / 10) % 100}`.slice(-2);
    const seconds = `0${Math.floor(interval / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(interval / 60000) % 60}`.slice(-2);
    return (
      <Layout className="timer">
        <Header className="timer__header">Timer</Header>
        <Content className="timer__display">
          {interval === 0 ? `00:00:00` : `${minutes}:${seconds}:${centiseconds}`}
        </Content>
        <Footer>
          {isActive ? pauseButton : startButton}
          <Button className="btn" onClick={this.resetTimer}>
            Reset
          </Button>
        </Footer>
      </Layout>
    );
  }
}
