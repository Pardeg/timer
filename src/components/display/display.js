import React from 'react';
import './display.scss';
import {Progress} from 'antd';
import PropTypes from 'prop-types';

const Display = (props) => {
  const { seconds, percent } = props;
  const displayMinutes = `0${Math.floor(seconds / 60)}`.slice(-2);
  const displaySeconds = `0${seconds % 60}`.slice(-2);
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
