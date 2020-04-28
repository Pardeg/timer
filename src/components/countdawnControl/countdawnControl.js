import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './countdawnControl.scss';

const Control = (props) => {
  const { isActive, start, reset, pause } = props;
  const startButton = <Button onClick={start}>Start</Button>;
  const resetButton = <Button onClick={reset}>Reset</Button>;
  const pauseButton = <Button onClick={pause}>Pause</Button>;
  return (
    <div className="control">
      {isActive ? pauseButton : startButton}
      {resetButton}
    </div>
  );
};

Control.defaultProps = {
  isActive: false,
  start: null,
  reset: null,
  pause: null,
};

Control.propTypes = {
  isActive: PropTypes.bool,
  start: PropTypes.func,
  reset: PropTypes.func,
  pause: PropTypes.func,
};
export default Control;
