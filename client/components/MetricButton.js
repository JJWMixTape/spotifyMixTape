import React, { PropTypes } from 'react';

const MetricButton = (props) => {
  const {metric, id, clickMetricButton} = props;

  console.log("Metric:",metric);
  console.log("ID:",id);

  if (metric === id) return (<img src="http://i.imgur.com/YOl8P6N.png" className="metricButton" onClick={()=> {clickMetricButton(id)}}/>)

  return(<img src="http://i.imgur.com/iNOWH0E.png" className="metricButton" onClick={()=> {clickMetricButton(id)}}/>)

}

MetricButton.propTypes = {
  metric: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  clickMetricButton: PropTypes.func,
};

export default MetricButton;