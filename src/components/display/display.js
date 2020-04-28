import React from 'react';
import './display.scss';
import { Progress } from 'antd';
import PropTypes from 'prop-types';

const Display = (props) => {
  const { seconds, percent } = props;
  const displayMinutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;
  return (
    <div className="display">
      <div className="display-time">
        {displayMinutes}:{displaySeconds}
      </div>
      <Progress type="circle" percent={percent} />
    </div>
  );
};
Display.defaultProps = {
  seconds: 0,
  percent: 0,
};
Display.propTypes = {
  seconds: PropTypes.number,
  percent: PropTypes.number,
};
export default Display;
