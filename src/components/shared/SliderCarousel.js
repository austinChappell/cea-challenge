import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.array).isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  title: null,
};

class SliderCarousel extends Component {
  state = {}
  render() {
    return (
      <div className="SliderCarousel">
        <h4>{this.props.title}:</h4>
        <div className="slider">
          {this.props.children}
        </div>
      </div>
    );
  }
}

SliderCarousel.propTypes = propTypes;
SliderCarousel.defaultProps = defaultProps;

export default SliderCarousel;
