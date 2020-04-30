/* eslint-disable */
import React from 'react';
import './timer.scss';
import {Button, Layout} from 'antd';

const {Header, Content, Footer} = Layout;
const initialState = {
    isActive: false,
    start: 0,
    interval: 0
}
export default class Timer extends React.Component {
    state = initialState;

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    calcTime = () => {
        this.setState(({start, interval}) => ({
            interval: Date.now() - start
        }));
        this.timer = setTimeout(this.calcTime, 100);
    }

    startTimer = () => {
        const {start} = this.state;
        if (start > 0) {
            this.setState(() => ({isActive: true}));
            this.calcTime();
        } else {
            this.setState(() => ({start: Date.now(), isActive: true}));
            this.calcTime();
        }

    };

    resetTimer = () => {
        this.setState(initialState);
        clearTimeout(this.timer);
    };

    pauseTimer = () => {
        this.setState(({interval, isActive}) => ({start: Date.now(), isActive: !isActive}));
        clearTimeout(this.timer);
    };
    toggleButton = () => {
        const {isActive} = this.state;
        if (isActive) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    render() {
        const {isActive, interval} = this.state;
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
                    <Button className="btn" onClick={this.toggleButton}>
                        {isActive ? 'Pause' : 'Start'}
                    </Button>
                    <Button className="btn" onClick={this.resetTimer}>
                        Reset
                    </Button>
                </Footer>
            </Layout>
        );
    }
}
