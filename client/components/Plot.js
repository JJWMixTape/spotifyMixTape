import React, { PropTypes } from 'react';

const Plot = (props) => {
  const { img } = props;

  return (
    <div id="Plot_container">
    </div>
  );

}

Plot.propTypes = {
  img: PropTypes.string.isRequired,
};

export default Plot;