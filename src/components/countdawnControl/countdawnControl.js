import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './countdawnControl.scss';

const Control = (props) => {
  const { isActive, reset, toggle } = props;
  const startButton = (
    <Button onClick={toggle} className="control__btn">
      {isActive ? 'Pause' : 'Start'}
    </Button>
  );
  const resetButton = (
    <Button onClick={reset} className="control__btn">
      Reset
    </Button>
  );
  return (
    <div className="control">
      {startButton}
      {resetButton}
    </div>
  );
};

Control.defaultProps = {
  isActive: false,
  toggle: null,
  reset: null,
};

Control.propTypes = {
  isActive: PropTypes.bool,
  toggle: PropTypes.func,
  reset: PropTypes.func,
};
export default Control;
