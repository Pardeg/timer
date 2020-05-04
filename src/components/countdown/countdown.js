import React from 'react';
import './countdown.scss';
import { InputNumber, Layout, Slider } from 'antd';
import Display from '../display/display';
import Control from '../countdawnControl/countdawnControl';
import mySound from '../../sounds/Tony Igy - Astronomia (mp3cut.net).mp3';

const sound = new Audio(mySound);
const initialState = {
  seconds: 0,
  isActive: false,
  allTime: 0,
  onePercent: 0,
  inputSeconds: 0,
  inputMinutes: 0,
  inputSlider: 0,
};
const { Header, Content, Footer } = Layout;
export default class Countdown extends React.Component {
  state = initialState;

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
      inputSlider: value,
    }));
  };

  calcTime = () => {
    const { seconds, isActive } = this.state;
    this.myInterval = setTimeout(this.calcTime, 1000);
    if (seconds > 0) {
      this.setState(() => ({
        seconds: seconds - 1,
        isActive: true,
      }));
    }
    if (seconds === 0 && isActive === true) {
      sound.play();
    }
  };

  startCountdown = () => {
    const { inputMinutes, inputSeconds, inputSlider } = this.state;
    if (inputMinutes > 0 || inputSeconds > 0 || inputSlider > 0) {
      this.setState(() => ({
        seconds: inputMinutes * 60 + inputSeconds + inputSlider,
        onePercent: (inputSeconds + inputMinutes * 60 + inputSlider) / 100,
        allTime: inputMinutes * 60 + inputSeconds + inputSlider,
      }));
      this.calcTime();
    }
  };

  resetCountdown = () => {
    sound.pause();
    sound.currentTime = 0;
    this.setState(initialState);
    clearTimeout(this.myInterval);
  };

  pauseCountdawn = () => {
    clearTimeout(this.myInterval);
    this.setState(() => ({ isActive: false }));
  };

  buttonToggle = () => {
    const { isActive } = this.state;
    if (isActive) {
      this.pauseCountdawn();
    } else {
      this.startCountdown();
    }
  };

  render() {
    const { seconds, isActive, allTime, onePercent } = this.state;
    const timePercent = Math.ceil((allTime - seconds) / onePercent);
    return (
      <Layout className="countdown">
        <Header className="countdown__title">Countdown</Header>
        <Content className="countdown__display">
          <Display seconds={seconds} active={isActive} percent={timePercent} />
          <Control toggle={this.buttonToggle} reset={this.resetCountdown} isActive={isActive} />
        </Content>
        <Footer>
          <div сlassName="countdown__input">
            <label className="countdown__input-item">
              <InputNumber onChange={this.inputMinutes} disabled={isActive} max={720} />
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
          <Slider onChange={this.inputSecondsSlider} disabled={isActive} step={15} max={3600} />
        </Footer>
      </Layout>
    );
  }
}
