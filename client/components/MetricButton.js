import React, { PropTypes } from 'react';

const MetricButton = (props) => {
  const {metric, id} = props;

  if (metric === id) return (<img src="http://i.imgur.com/YOl8P6N.png" className="metricButton"/>)

  return(<img src="http://i.imgur.com/iNOWH0E.png" className="metricButton"/>)

}

MetricButton.propTypes = {
  metric: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default MetricButton;