import React, { PropTypes } from 'react';

const Plot = (props) => {
  const { img } = props;

  return (
    <div id="Plot_container">
      <img src="http://i.imgur.com/zlLcuiJ.png"/>
    </div>
  );

}

Plot.propTypes = {
  img: PropTypes.string.isRequired,
};

export default Plot;