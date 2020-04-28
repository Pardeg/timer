import React from 'react';
import './countdown.scss';
import { InputNumber, Layout, Slider } from 'antd';
import Display from '../display/display';
import Control from '../countdawnControl/countdawnControl';
import mySound from '../../sounds/Tony Igy - Astronomia (mp3cut.net).mp3';

const sound = new Audio(mySound);

const { Header, Content, Footer } = Layout;
export default class Countdown extends React.Component {
  state = {
    minutes: 0,
    seconds: 0,
    isActive: false,
    allTime: 0,
    timePercent: 0,
    onePercent: 0,
    inputSeconds: 0,
    inputMinutes: 0,
  };

  componentDidMount() {
    const { minutes, seconds } = this.state;
    if (minutes === 0 && seconds === 0) {
      clearTimeout(this.myInterval);
    }
  }

  inputMinutes = (value) => {
    this.setState(() => ({
      inputMinutes: value,
    }));
  };

  inputSeconds = (value) => {
    this.setState(() => ({ inputSeconds: value }));
  };

  inputSecondsSlider = (value) => {
    this.setState(() => ({
      seconds: value * 15,
    }));
  };

  calcTime = () => {
    const { seconds, allTime, onePercent, timePercent } = this.state;
    this.myInterval = setTimeout(this.calcTime, 1000);
    if (seconds > 0) {
      this.setState(() => ({
        seconds: seconds - 1,
        isActive: true,
        timePercent: Math.ceil((allTime - seconds + 1) / onePercent),
      }));
    }
    if (seconds === 0 && timePercent === 100) {
      sound.play();
    }
  };

  startCountdown = () => {
    const { inputMinutes, inputSeconds } = this.state;
    this.setState(() => ({
      seconds: inputMinutes * 60 + inputSeconds,
      onePercent: (inputSeconds + inputMinutes * 60) / 100,
      allTime: inputMinutes * 60 + inputSeconds,
    }));
    this.calcTime();
  };

  resetCountdown = () => {
    sound.pause();
    sound.currentTime = 0;
    this.setState(() => ({
      seconds: 0,
      inputSeconds: 0,
      inputMinutes: 0,
      isActive: false,
      timePercent: 0,
      allTime: 0,
      onePercent: 0,
    }));
    clearTimeout(this.myInterval);
  };

  pauseCountdawn = () => {
    clearTimeout(this.myInterval);
    this.setState(() => ({ isActive: false }));
  };

  render() {
    const { minutes, seconds, isActive, timePercent } = this.state;
    return (
      <Layout className="countdown">
        <Header className="countdown__title">Countdown</Header>
        <Content className="countdown__display">
          <Display seconds={seconds} minutes={minutes} active={isActive} percent={timePercent} />
          <Control
            start={this.startCountdown}
            reset={this.resetCountdown}
            pause={this.pauseCountdawn}
            isActive={isActive}
          />
        </Content>
        <Footer>
          <div lassName="countdown__input">
            <label className="countdown__input-item">
              <InputNumber onChange={this.inputMinutes} disabled={isActive} />
              Minutes
            </label>

            <label className="countdown__input-item">
              <InputNumber
                onChange={this.inputSeconds}
                disabled={isActive}
                defaultValue={0}
                min={0}
                max={60}
              />
              Seconds
            </label>
          </div>
          <Slider onChange={this.inputSecondsSlider} disabled={isActive} />
        </Footer>
      </Layout>
    );
  }
}
